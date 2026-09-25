<?php

declare(strict_types=1);

$routes = array_merge(
    require dirname(__DIR__) . '/routes/web.php',
    require dirname(__DIR__) . '/routes/admin.php',
    require dirname(__DIR__) . '/routes/api.php'
);

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
$scriptDirectory = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');
$projectDirectory = preg_replace('#/public$#', '', $scriptDirectory);
if ($projectDirectory !== '' && $projectDirectory !== '/' && strpos($path, $projectDirectory) === 0) {
    $path = substr($path, strlen($projectDirectory)) ?: '/';
} elseif ($scriptDirectory !== '' && $scriptDirectory !== '/' && strpos($path, $scriptDirectory) === 0) {
    $path = substr($path, strlen($scriptDirectory)) ?: '/';
}
$path = '/' . trim($path, '/');
$path = $path === '//' ? '/' : $path;

$matchedRoute = null;
$parameters = [];
foreach ($routes as $route) {
    if ($route[0] !== $method) {
        continue;
    }

    $pattern = preg_replace('#\\{[^}]+\\}#', '([^/]+)', $route[1]);
    if (preg_match('#^' . $pattern . '/?$#', $path, $matches)) {
        $matchedRoute = $route;
        array_shift($matches);
        preg_match_all('#\\{([^}]+)\\}#', $route[1], $names);
        $parameters = array_combine($names[1], $matches) ?: [];
        break;
    }
}

if ($matchedRoute === null) {
    http_response_code(404);
    if (strpos($path, '/api/') === 0) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Route not found'], JSON_PRETTY_PRINT);
        exit;
    }
    $matchedRoute = ['GET', '/404', 'not-found', 'Page Not Found', 'The page you requested could not be found.'];
}

if (strpos($path, '/api/') === 0) {
    header('Content-Type: application/json; charset=utf-8');
    $payloads = [
        'health' => ['status' => 'ok', 'service' => 'AapleGuruji'],
        'services' => ['services' => ['Kundali', 'Puja', 'Vastu consultation']],
        'pandits' => ['pandits' => []],
        'puja' => ['puja' => []],
        'create-booking' => ['message' => 'Booking request received', 'data' => $_POST],
        'contact' => ['message' => 'Contact request received'],
    ];
    echo json_encode($payloads[$matchedRoute[2]] ?? ['message' => 'Request received'], JSON_PRETTY_PRINT);
    exit;
}

$title = htmlspecialchars($matchedRoute[3], ENT_QUOTES, 'UTF-8');
$description = htmlspecialchars($matchedRoute[4], ENT_QUOTES, 'UTF-8');
$routeName = htmlspecialchars($matchedRoute[2], ENT_QUOTES, 'UTF-8');
$baseUrl = $projectDirectory !== '' ? $projectDirectory : $scriptDirectory;
$assetBaseUrl = $scriptDirectory === '' || $scriptDirectory === '/'
    ? '/public'
    : (substr($scriptDirectory, -7) === '/public' ? $scriptDirectory : $scriptDirectory . '/public');

if ($matchedRoute[2] === 'home' && $method === 'GET') {
    require dirname(__DIR__) . '/app/Views/home/index.php';
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?> | AapleGuruji</title>
    <link rel="stylesheet" href="<?= $assetBaseUrl ?>/assets/css/output.css">
</head>
<body>
    <main style="max-width: 960px; margin: 0 auto; padding: 3rem 1.5rem; font-family: system-ui, sans-serif;">
        <nav style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 4rem;">
            <a href="<?= $baseUrl ?>/">Home</a>
            <a href="<?= $baseUrl ?>/kundali">Kundali</a>
            <a href="<?= $baseUrl ?>/pandits">Pandits</a>
            <a href="<?= $baseUrl ?>/puja">Puja</a>
            <a href="<?= $baseUrl ?>/vastu">Vastu</a>
            <a href="<?= $baseUrl ?>/booking">Book now</a>
        </nav>
        <p style="color: #777; text-transform: uppercase; letter-spacing: .12em;"><?= $routeName ?></p>
        <h1><?= $title ?></h1>
        <p style="font-size: 1.2rem; max-width: 36rem;"><?= $description ?></p>
        <?php if ($method === 'POST'): ?>
            <p style="padding: 1rem; background: #eef8ee;">Your request was received successfully.</p>
        <?php endif; ?>
    </main>
</body>
</html>