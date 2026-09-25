from pathlib import Path

PROJECT_NAME = "aaple-guruji"

folders = [
    # Public
    "public/assets/css",
    "public/assets/js",
    "public/assets/images",
    "public/assets/fonts",

    # Application Core
    "app/Core",

    # Domain
    "app/Domain/User",
    "app/Domain/Puja",
    "app/Domain/Pandit",
    "app/Domain/Booking",
    "app/Domain/Kundali",
    "app/Domain/Vastu",
    "app/Domain/Payment",
    "app/Domain/Notification",

    # Application Layer
    "app/Application/Auth",
    "app/Application/Booking",
    "app/Application/Puja",
    "app/Application/Pandit",
    "app/Application/Payment",
    "app/Application/Kundali",

    # Infrastructure
    "app/Infrastructure/Database/Repositories",
    "app/Infrastructure/Payment",
    "app/Infrastructure/WhatsApp",
    "app/Infrastructure/Email",
    "app/Infrastructure/Storage",

    # HTTP
    "app/Http/Controllers",
    "app/Http/Middleware",
    "app/Http/Requests",

    # Views
    "app/Views/layouts",
    "app/Views/components",
    "app/Views/home",
    "app/Views/puja",
    "app/Views/pandit",
    "app/Views/booking",
    "app/Views/kundali",
    "app/Views/vastu",
    "app/Views/auth",

    # Routes
    "routes",

    # Configuration
    "config",

    # Database
    "database/migrations",
    "database/seeders",
    "database/backups",

    # Storage
    "storage/logs",
    "storage/cache",
    "storage/uploads",
    "storage/sessions",

    # Tests
    "tests/Unit",
    "tests/Feature",
]

files = [
    "public/index.php",
    "public/.htaccess",

    "routes/web.php",
    "routes/api.php",
    "routes/admin.php",

    "config/app.php",
    "config/database.php",
    "config/payment.php",
    "config/services.php",

    ".env",
    ".env.example",
    "composer.json",
    "README.md",
]

# Create project directory
root = Path(PROJECT_NAME)
root.mkdir(exist_ok=True)

# Create folders
for folder in folders:
    path = root / folder
    path.mkdir(parents=True, exist_ok=True)

# Create files
for file in files:
    path = root / file
    path.touch(exist_ok=True)

print("\n✅ Aaple Guruji project structure created successfully!\n")

print(f"📁 Location: {root.resolve()}")
print("\nStructure:")

# Display structure
for path in sorted(root.rglob("*")):
    relative = path.relative_to(root)

    if path.is_dir():
        print(f"📁 {relative}/")
    else:
        print(f"📄 {relative}")

print("\n🚀 Ready for development!")