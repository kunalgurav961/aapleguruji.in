<?php
$baseUrl = $baseUrl ?? '';
$assetBaseUrl = $assetBaseUrl ?? $baseUrl;
$services = [
    ['image' => 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=700&q=85', 'name' => 'Griha Pravesh Puja', 'copy' => 'For a happy new beginning', 'price' => '₹5,100'],
    ['image' => 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=85', 'name' => 'Satyanarayan Puja', 'copy' => 'For peace and prosperity', 'price' => '₹3,100'],
    ['image' => 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=700&q=85', 'name' => 'Vastu Shanti Puja', 'copy' => 'Remove dosh, bring harmony', 'price' => '₹4,500'],
    ['image' => 'https://images.unsplash.com/photo-1582550945154-66ea8fff25e1?auto=format&fit=crop&w=700&q=85', 'name' => 'Rudrabhishek', 'copy' => 'For health, wealth and peace', 'price' => '₹2,100'],
    ['image' => 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=700&q=85', 'name' => 'Marriage Puja', 'copy' => 'For a blessed married life', 'price' => '₹7,500'],
    ['image' => 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=700&q=85', 'name' => 'Free Kundali Matching', 'copy' => 'Find the right life partner', 'price' => '100% Free'],
];
$festivals = [
    ['image' => 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=80', 'name' => 'Navratri', 'date' => '3 - 11 Oct 2025'],
    ['image' => 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=700&q=80', 'name' => 'Dussehra', 'date' => '12 Oct 2025'],
    ['image' => 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=700&q=80', 'name' => 'Diwali', 'date' => '20 Oct 2025'],
    ['image' => 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80', 'name' => 'Tulsi Vivah', 'date' => '2 Nov 2025'],
    ['image' => 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=700&q=80', 'name' => 'Dev Deepavali', 'date' => '5 Nov 2025'],
];
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Aaple Guruji - authentic puja services, verified pandits and vastu guidance.">
    <title>Aaple Guruji | Shraddha Seva Sanskar</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= $assetBaseUrl ?>/assets/css/landing.css">
</head>
<body>
<header class="site-header">
    <a class="brand" href="<?= $baseUrl ?>/" aria-label="Aaple Guruji home">
        <span class="brand-mark">ॐ</span><span><strong>Aaple Guruji</strong><small>Shraddha Seva Sanskar</small></span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
        <a href="#services">Puja Services</a><a href="<?= $baseUrl ?>/pandits">Pandit</a><a href="<?= $baseUrl ?>/kundali">Kundali</a><a href="<?= $baseUrl ?>/vastu">Vastu</a><a href="#festivals">Panchang</a><a href="<?= $baseUrl ?>/about">About Us</a>
    </nav>
    <div class="header-actions"><a href="<?= $baseUrl ?>/contact">◉ &nbsp;Help</a><a href="<?= $baseUrl ?>/login" aria-label="Login">♙</a><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch theme"><span>☼</span><span>☾</span></button><a class="header-cta" href="<?= $baseUrl ?>/booking">Book a Puja <span>→</span></a></div>
    <button class="menu-toggle" type="button" data-menu-toggle aria-label="Open menu">☰</button>
</header>

<main>
<section class="hero">
    <video class="hero-video" autoplay muted loop playsinline preload="metadata" poster="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1800&q=85" aria-hidden="true"><source src="<?= $assetBaseUrl ?>/assets/videos/pooja.mp4" type="video/mp4"></video><div class="hero-photo"></div><div class="hero-wash"></div>
    <div class="hero-content wrap"><p class="eyebrow">AUTHENTIC RITUALS. TRUSTED GUIDANCE.</p><h1>परंपरा तुमच्या घरी,<br><em>विश्वास आमच्यासोबत.</em></h1><p class="hero-subtitle">Authentic Puja Services | Verified Pandits |<br>Online &amp; At Your Home | Across India</p><div class="hero-benefits"><span>♙ <b>Verified</b>Pandits</span><span>▣ <b>Transparent</b>Pricing</span><span>▣ <b>Online Puja</b>Live Streaming</span><span>⌂ <b>Puja Samagri</b>Available</span><span>▣ <b>100% Secure</b>Booking</span></div></div>
    <p class="hero-quote">“Good<br>Rituals<br>Brighter<br>Tomorrows”</p>
    <section class="booking-panel wrap" aria-label="Find a service">
    <div class="booking-tabs"><button class="active" type="button">♨ &nbsp; Book a Puja</button><button type="button">▣ &nbsp; Online Puja</button><button type="button">♧ &nbsp; Vastu Consultation</button><button type="button">♧ &nbsp; Kundali Matching</button></div>
    <form class="booking-form" action="<?= $baseUrl ?>/booking" method="post"><label>Select Puja<select><option>Eg. Griha Pravesh, Satyanarayan...</option></select></label><label>Location<select><option>Enter your city</option></select></label><label>Preferred Language<select><option>Marathi</option><option>Hindi</option><option>English</option></select></label><label>Date<input type="date"></label><button class="button button-dark" type="submit">Find Pandit <span>→</span></button></form>
    </section>
</section>

<section class="section wrap" id="services"><div class="section-heading"><div><p class="eyebrow">OUR SERVICES</p><h2>Popular Puja Services</h2><p>Choose from 50+ authentic pujas performed by experienced and verified pandits.</p></div><a href="<?= $baseUrl ?>/puja">View All Services <span>→</span></a></div><div class="service-grid"><?php foreach ($services as $service): ?><article class="service-card"><img src="<?= htmlspecialchars($service['image'], ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($service['name'], ENT_QUOTES, 'UTF-8') ?>"><div class="card-body"><h3><?= $service['name'] ?></h3><p><?= $service['copy'] ?></p><strong><?= $service['price'] ?></strong><a href="<?= $baseUrl ?>/booking">Book Now <span>→</span></a></div></article><?php endforeach; ?></div></section>

<section class="stats-band"><div class="wrap stats-grid"><div><b>♨</b><strong>50,000+</strong><span>Happy Customers</span></div><div><b>♧</b><strong>500+</strong><span>Verified Pandits</span></div><div><b>⌖</b><strong>50+</strong><span>Cities Across India</span></div><div><b>★</b><strong>4.9/5</strong><span>Customer Rating</span></div><p>“Sanatan Parampara<br>in the Digital Era”</p></div></section>

<section class="section how-section"><div class="wrap"><div class="center-heading"><p class="eyebrow">THE SIMPLE WAY</p><h2>How Aaple Guruji Works</h2><p>Simple steps to bring divinity into your life.</p></div><div class="steps"><div><i>1</i><b>▣</b><h3>Select Your Puja</h3><p>Browse from 50+ puja services</p></div><span>→</span><div><i>2</i><b>▦</b><h3>Choose Date &amp; Location</h3><p>At your home or online</p></div><span>→</span><div><i>3</i><b>♙</b><h3>Get Verified Pandit</h3><p>We match the best pandit for you</p></div><span>→</span><div><i>4</i><b>♨</b><h3>Perform Puja &amp; Receive Blessings</h3><p>Experience peace and positivity</p></div></div></div></section>

<section class="why-section"><div class="wrap why-grid"><div class="why-copy"><p class="eyebrow">WHY CHOOSE US</p><h2>Why Choose<br>Aaple Guruji?</h2><ul><li>Verified &amp; Experienced Pandits</li><li>Online Puja with Live Streaming</li><li>Vastu Consultation &amp; Remedies</li><li>Free Patrika / Kundali Matching</li><li>Puja Samagri Delivery</li><li>Support in Marathi, Hindi &amp; English</li></ul><a class="button button-dark" href="<?= $baseUrl ?>/about">Know More <span>→</span></a></div><article class="feature-card matching"><b>♡</b><h3>Free<br>Patrika Matching</h3><p>Find the right match with accurate Kundali analysis</p><a class="button button-dark" href="<?= $baseUrl ?>/kundali">Check Now <span>→</span></a></article><article class="feature-card vastu"><b>☼</b><h3>Vastu Consultation</h3><p>Bring positivity, prosperity and peace to your home</p><a class="button button-dark" href="<?= $baseUrl ?>/vastu">Book Vastu Consultation <span>→</span></a></article></div></section>

<section class="section testimonials"><div class="center-heading"><p class="eyebrow">REAL STORIES</p><h2>What Our Customers Say</h2><p>Thousands of families trust Aaple Guruji for their spiritual journey.</p></div><div class="wrap testimonial-grid"><article><div class="person"><span>SP</span><b>Sneha Patil<small>Pune</small></b></div><div class="stars">★★★★★</div><p>“Griha Pravesh puja was done so beautifully. Panditji was very knowledgeable and humble. Highly recommended!”</p></article><article><div class="person"><span>AD</span><b>Amit Deshmukh<small>Mumbai</small></b></div><div class="stars">★★★★★</div><p>“Booked online Satyanarayan puja. The live streaming experience was excellent. Felt very connected even from abroad.”</p></article><article><div class="person"><span>RP</span><b>Rohit &amp; Priya<small>Bengaluru</small></b></div><div class="stars">★★★★★</div><p>“Free kundali matching service is very accurate. We got great guidance. Thank you Aaple Guruji!”</p></article></div><div class="dots"><b></b><i></i><i></i></div></section>

<section class="section wrap festivals" id="festivals"><div class="section-heading"><div><p class="eyebrow">MARK YOUR CALENDAR</p><h2>Upcoming Festivals &amp; Auspicious Dates</h2><p>Stay updated with important Hindu festivals and shubh muhurat.</p></div><a href="#festivals">View Panchang <span>→</span></a></div><div class="festival-grid"><?php foreach ($festivals as $festival): ?><article><img src="<?= htmlspecialchars($festival['image'], ENT_QUOTES, 'UTF-8') ?>" alt="<?= $festival['name'] ?>"><h3><?= $festival['name'] ?></h3><p><?= $festival['date'] ?></p><a href="<?= $baseUrl ?>/booking">Book Now</a></article><?php endforeach; ?></div></section>

<section class="app-promo"><div class="wrap app-grid"><div><p class="eyebrow">YOUR SPIRITUAL COMPANION</p><h2>Divine Services<br>Now in Your Pocket</h2><p>Download Aaple Guruji App</p><div class="store-buttons"><a href="#"> App Store</a><a href="#">▶ Google Play</a></div></div><div class="phone"><span>ॐ</span><b>Aaple Guruji</b><small>Shraddha Seva Sanskar</small></div><ul><li>◉ Easy Booking</li><li>♧ Puja Reminders</li><li>◌ Festival Updates</li><li>✦ Exclusive Offers</li></ul><em>“Where Faith<br>Meets Technology”</em></div></section>
</main>
<footer class="site-footer"><div class="wrap footer-grid"><div class="footer-brand"><a class="brand" href="<?= $baseUrl ?>/"><span class="brand-mark">ॐ</span><span><strong>Aaple Guruji</strong><small>Shraddha Seva Sanskar</small></span></a><p>Bringing ancient traditions closer to you with trust, technology and a heartfelt commitment to dharma.</p><div class="socials">◎ &nbsp; ◉ &nbsp; ▶ &nbsp; ◌ &nbsp; in</div></div><div><h4>Quick Links</h4><a href="#services">Puja Services</a><a href="<?= $baseUrl ?>/pandits">Pandit Registration</a><a href="<?= $baseUrl ?>/kundali">Kundali Matching</a><a href="<?= $baseUrl ?>/vastu">Vastu Consultation</a><a href="#festivals">Panchang</a><a href="<?= $baseUrl ?>/about">Blog</a></div><div><h4>Support</h4><a href="<?= $baseUrl ?>/contact">Help Center</a><a href="<?= $baseUrl ?>/contact">Contact Us</a><a href="#">Terms &amp; Conditions</a><a href="#">Privacy Policy</a><a href="#">Refund Policy</a><a href="#">FAQ</a></div><div><h4>Contact Us</h4><a href="tel:+919876543210">⌕ &nbsp; +91 98765 43210</a><a href="mailto:support@aapleguruji.in">✉ &nbsp; support@aapleguruji.in</a><a href="#">⌖ &nbsp; Pune, Maharashtra, India</a></div><div class="newsletter"><h4>Subscribe to Our Newsletter</h4><p>Get updates on festivals, special pujas and exclusive offers.</p><form><input type="email" placeholder="Enter your email"><button type="submit">→</button></form><em>Jai Shree Ram</em></div></div><div class="footer-bottom wrap"><span>© 2025 Aaple Guruji. All rights reserved.</span><span>Faith &nbsp; | &nbsp; Service &nbsp; | &nbsp; Tradition &nbsp; | &nbsp; For a Better Tomorrow</span></div></footer>
<script src="<?= $assetBaseUrl ?>/assets/js/landing.js"></script>
</body>
</html>
