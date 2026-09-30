<?php
// Aaple Guruji - Landing Page
// Place your images inside:
// /assets/images/
// Place your logo at:
// /assets/logo.png
?>

<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Aaple Guruji | धार्मिक कार्य जेथे, आपले गुरुजी तेथे</title>

    <meta name="description"
          content="Aaple Guruji - Online Puja, Vastu Shanti, Griha Pravesh, Kundali Matching, Patrika Matching and traditional religious services.">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Tiro+Devanagari+Marathi:ital@0;1&display=swap"
          rel="stylesheet">

    <!-- Lucide -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        saffron: '#F97316',
                        deepMaroon: '#64111D',
                        maroon: '#8B1725',
                        cream: '#FFF9EF',
                        gold: '#D99A22',
                        dark: '#24120D'
                    },

                    fontFamily: {
                        sans: ['DM Sans', 'sans-serif'],
                        marathi: ['Tiro Devanagari Marathi', 'serif']
                    },

                    boxShadow: {
                        glow: '0 0 60px rgba(249,115,22,.20)'
                    }
                }
            }
        }
    </script>

    <style>

        html {
            scroll-behavior: smooth;
        }

        body {
            background: #fffaf2;
            color: #24120D;
            overflow-x: hidden;
        }

        .marathi {
            font-family: 'Tiro Devanagari Marathi', serif;
        }

        .hero-gradient {
            background:
                radial-gradient(circle at 10% 20%, rgba(249,115,22,.18), transparent 30%),
                radial-gradient(circle at 90% 20%, rgba(217,154,34,.20), transparent 30%),
                linear-gradient(135deg, #fffaf2 0%, #fff1dc 100%);
        }

        .gold-gradient {
            background: linear-gradient(
                135deg,
                #B97812,
                #F6D477,
                #C88919
            );
        }

        .text-gradient {
            background: linear-gradient(
                90deg,
                #8B1725,
                #F97316,
                #B97812
            );

            -webkit-background-clip: text;
            color: transparent;
        }

        .glass {
            background: rgba(255,255,255,.65);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border: 1px solid rgba(139,23,37,.08);
        }

        .service-card {
            transition: .4s cubic-bezier(.2,.8,.2,1);
        }

        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 60px rgba(100,17,29,.13);
        }

        .service-card img {
            transition: transform .7s cubic-bezier(.2,.8,.2,1);
        }

        .service-card:hover img {
            transform: scale(1.08);
        }

        .hero-image {
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%,100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-12px);
            }
        }

        .mandala {
            position: absolute;
            border: 1px solid rgba(217,154,34,.25);
            border-radius: 50%;
        }

        .noise {
            background-image:
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
        }

        .reveal {
            opacity: 0;
            transform: translateY(40px);
        }

    </style>
</head>


<body class="font-sans noise">

<!-- =====================================================
     NAVBAR
===================================================== -->

<header id="navbar"
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">

    <div class="max-w-7xl mx-auto px-5 lg:px-8">

        <nav class="flex items-center justify-between h-20">

            <!-- Logo -->

            <a href="#" class="flex items-center gap-3">

                <img
                    src="/assets/logo.png"
                    alt="Aaple Guruji"
                    class="h-14 w-auto object-contain"
                >

            </a>


            <!-- Desktop Navigation -->

            <div class="hidden lg:flex items-center gap-8">

                <a href="#home"
                   class="text-sm font-semibold hover:text-saffron transition">
                    Home
                </a>

                <a href="#services"
                   class="text-sm font-semibold hover:text-saffron transition">
                    Services
                </a>

                <a href="#why-us"
                   class="text-sm font-semibold hover:text-saffron transition">
                    Why Aaple Guruji
                </a>

                <a href="#about"
                   class="text-sm font-semibold hover:text-saffron transition">
                    About
                </a>

                <a href="#contact"
                   class="text-sm font-semibold hover:text-saffron transition">
                    Contact
                </a>

            </div>


            <!-- CTA -->

            <a href="#contact"
               class="hidden sm:flex items-center gap-2 bg-deepMaroon text-white px-5 py-3 rounded-full font-semibold hover:bg-maroon transition">

                <i data-lucide="calendar-check" class="w-4 h-4"></i>

                Book a Puja

            </a>


            <!-- Mobile -->

            <button id="menuBtn"
                    class="lg:hidden p-2">

                <i data-lucide="menu"></i>

            </button>

        </nav>

    </div>

</header>


<!-- =====================================================
     MOBILE MENU
===================================================== -->

<div id="mobileMenu"
     class="fixed inset-0 z-40 bg-cream hidden">

    <div class="flex flex-col items-center justify-center h-full gap-8 text-xl">

        <a href="#home" class="mobile-link">Home</a>

        <a href="#services" class="mobile-link">Services</a>

        <a href="#why-us" class="mobile-link">Why Us</a>

        <a href="#about" class="mobile-link">About</a>

        <a href="#contact" class="mobile-link">Contact</a>

    </div>

</div>


<!-- =====================================================
     HERO
===================================================== -->

<section id="home"
         class="relative min-h-screen hero-gradient overflow-hidden pt-28">

    <!-- Decorative -->

    <div class="mandala w-[500px] h-[500px] -left-64 top-40"></div>

    <div class="mandala w-[700px] h-[700px] -right-96 top-20"></div>


    <div class="max-w-7xl mx-auto px-5 lg:px-8">

        <div class="grid lg:grid-cols-2 items-center min-h-[calc(100vh-112px)] gap-12">


            <!-- LEFT -->

            <div id="heroContent"
                 class="relative z-10">

                <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-7">

                    <span class="w-2 h-2 bg-saffron rounded-full animate-pulse"></span>

                    <span class="text-sm font-semibold text-deepMaroon">
                        परंपरा • श्रद्धा • विश्वास
                    </span>

                </div>


                <h1 class="marathi text-5xl sm:text-6xl lg:text-7xl leading-[1.12] font-bold">

                    आपल्या श्रद्धेसाठी,

                    <span class="block text-gradient">
                        आपले गुरुजी
                    </span>

                </h1>


                <p class="marathi text-xl lg:text-2xlmt-7 text-gray-700 leading-relaxed max-w-xl">

                    धार्मिक कार्य जेथे,
                    <strong class="text-deepMaroon">
                        आपले गुरुजी तेथे.
                    </strong>

                </p>


                <p class="text-gray-600 mt-5 max-w-lg leading-7">

                    पूजा, धार्मिक विधी, Vastu Shanti,
                    Griha Pravesh, Kundali Matching
                    आणि इतर धार्मिक सेवांसाठी
                    एक विश्वासू व्यासपीठ.

                </p>


                <!-- Buttons -->

                <div class="flex flex-wrap gap-4 mt-9">

                    <a href="#services"
                       class="group flex items-center gap-3 bg-deepMaroon text-white px-7 py-4 rounded-full font-semibold hover:bg-maroon transition shadow-xl">

                        Explore Services

                        <i data-lucide="arrow-right"
                           class="w-5 h-5 group-hover:translate-x-1 transition">
                        </i>

                    </a>


                    <a href="tel:9112212165"
                       class="flex items-center gap-3 border border-deepMaroon/20 bg-white/70 px-7 py-4 rounded-full font-semibold hover:bg-white transition">

                        <i data-lucide="phone"
                           class="w-5 h-5 text-saffron">
                        </i>

                        9112212165

                    </a>

                </div>


                <!-- Trust -->

                <div class="flex flex-wrap gap-6 mt-10 text-sm text-gray-600">

                    <div class="flex items-center gap-2">

                        <i data-lucide="shield-check"
                           class="text-saffron">
                        </i>

                        विश्वासू गुरुजी

                    </div>

                    <div class="flex items-center gap-2">

                        <i data-lucide="heart-handshake"
                           class="text-saffron">
                        </i>

                        पारंपरिक विधी

                    </div>

                    <div class="flex items-center gap-2">

                        <i data-lucide="headphones"
                           class="text-saffron">
                        </i>

                        Support

                    </div>

                </div>

            </div>


            <!-- RIGHT -->

            <div class="relative flex justify-center">

                <!-- Glow -->

                <div class="absolute w-[500px] h-[500px] bg-orange-300/30 blur-[100px] rounded-full">
                </div>


                <div class="hero-image relative z-10">

                    <div class="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">

                        <img
                            src="/assets/images/108b469e-8657-4e4b-b40f-69be9f3ea445.jpg"
                            alt="Puja Ceremony"
                            class="w-[480px] h-[580px] object-cover"
                        >

                    </div>


                    <!-- Floating Card -->

                    <div class="absolute -left-8 bottom-16 glass rounded-2xl p-5 shadow-xl">

                        <div class="flex items-center gap-3">

                            <div class="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">

                                <i data-lucide="sparkles"
                                   class="text-saffron">
                                </i>

                            </div>

                            <div>

                                <p class="font-bold">
                                    शुभ कार्यांची सुरुवात
                                </p>

                                <p class="text-xs text-gray-500">
                                    With Aaple Guruji
                                </p>

                            </div>

                        </div>

                    </div>


                    <!-- Om -->

                    <div class="absolute -right-5 -top-5 w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-white text-3xl shadow-xl">

                        ॐ

                    </div>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- =====================================================
     SERVICES
===================================================== -->

<section id="services"
         class="py-24 bg-white">

    <div class="max-w-7xl mx-auto px-5 lg:px-8">


        <div class="text-center max-w-2xl mx-auto reveal">

            <span class="text-saffron font-bold text-sm uppercase tracking-[.25em]">
                Our Services
            </span>

            <h2 class="marathi text-4xl lg:text-5xl font-bold mt-4 text-deepMaroon">

                आपल्या धार्मिक गरजा,
                <span class="text-gradient">
                    एका ठिकाणी.
                </span>

            </h2>

            <p class="text-gray-600 mt-5">

                परंपरेनुसार धार्मिक विधी आणि आधुनिक
                booking experience — Aaple Guruji सोबत.

            </p>

        </div>


        <!-- Services -->

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">


            <!-- Online Puja -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/feature1.jpeg"
                         class="w-full h-full object-cover"
                         alt="Online Puja">

                </div>

                <div class="p-6">

                    <div class="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">

                        <i data-lucide="video"
                           class="text-saffron">
                        </i>

                    </div>

                    <h3 class="text-xl font-bold">
                        Online Puja
                    </h3>

                    <p class="text-gray-600 mt-2">
                        घरबसल्या श्रद्धेने पूजा विधी करण्याची सुविधा.
                    </p>

                </div>

            </div>


            <!-- Vastu -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/vastu_shanti_service.jpeg"
                         class="w-full h-full object-cover"
                         alt="Vastu Shanti">

                </div>

                <div class="p-6">

                    <div class="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">

                        <i data-lucide="house"
                           class="text-saffron">
                        </i>

                    </div>

                    <h3 class="text-xl font-bold">
                        Vastu Shanti Puja
                    </h3>

                    <p class="text-gray-600 mt-2">
                        घरात सकारात्मकता आणि शांतीसाठी पारंपरिक विधी.
                    </p>

                </div>

            </div>


            <!-- Griha Pravesh -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/gaha_pravesh.jpeg"
                         class="w-full h-full object-cover"
                         alt="Griha Pravesh">

                </div>

                <div class="p-6">

                    <div class="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">

                        <i data-lucide="home"
                           class="text-saffron">
                        </i>

                    </div>

                    <h3 class="text-xl font-bold">
                        Griha Pravesh
                    </h3>

                    <p class="text-gray-600 mt-2">
                        नवीन घरासाठी शुभ आणि मंगलमय सुरुवात.
                    </p>

                </div>

            </div>


            <!-- Satyanarayan -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/feature2.jpeg"
                         class="w-full h-full object-cover"
                         alt="Satyanarayan Puja">

                </div>

                <div class="p-6">

                    <h3 class="text-xl font-bold">
                        Satyanarayan Puja
                    </h3>

                    <p class="text-gray-600 mt-2">
                        सुख, समृद्धी आणि कुटुंबाच्या कल्याणासाठी.
                    </p>

                </div>

            </div>


            <!-- Wedding -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/IMG-20240830-WA0011.jpg"
                         class="w-full h-full object-cover"
                         alt="Wedding Rituals">

                </div>

                <div class="p-6">

                    <h3 class="text-xl font-bold">
                        Wedding Rituals
                    </h3>

                    <p class="text-gray-600 mt-2">
                        विवाहातील पारंपरिक धार्मिक विधी आणि मार्गदर्शन.
                    </p>

                </div>

            </div>


            <!-- Kundali -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/all_kundali_services.jpeg"
                         class="w-full h-full object-cover"
                         alt="Kundali Matching">

                </div>

                <div class="p-6">

                    <div class="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">

                        <i data-lucide="heart"
                           class="text-saffron">
                        </i>

                    </div>

                    <h3 class="text-xl font-bold">
                        Free Patrika Matching
                    </h3>

                    <p class="text-gray-600 mt-2">
                        लग्नासाठी Kundali / Patrika Matching सुविधा.
                    </p>

                </div>

            </div>


            <!-- Kundali Analysis -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/kundali_service.jpeg"
                         class="w-full h-full object-cover"
                         alt="Kundali Analysis">

                </div>

                <div class="p-6">

                    <h3 class="text-xl font-bold">
                        Kundali Analysis
                    </h3>

                    <p class="text-gray-600 mt-2">
                        कुंडलीचा सखोल अभ्यास आणि मार्गदर्शन.
                    </p>

                </div>

            </div>


            <!-- Naamkaran -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/IMG-20240830-WA0009.jpg"
                         class="w-full h-full object-cover"
                         alt="Naamkaran Puja">

                </div>

                <div class="p-6">

                    <h3 class="text-xl font-bold">
                        Naamkaran Puja
                    </h3>

                    <p class="text-gray-600 mt-2">
                        बाळाच्या आयुष्यातील शुभ सुरुवातीसाठी पारंपरिक विधी.
                    </p>

                </div>

            </div>


            <!-- Other -->

            <div class="service-card reveal rounded-3xl overflow-hidden bg-cream border border-orange-100">

                <div class="h-56 overflow-hidden">

                    <img src="/assets/images/navgraha_service.jpeg"
                         class="w-full h-full object-cover"
                         alt="Religious Puja">

                </div>

                <div class="p-6">

                    <h3 class="text-xl font-bold">
                        Other Religious Pujas
                    </h3>

                    <p class="text-gray-600 mt-2">
                        तुमच्या गरजेनुसार विविध धार्मिक पूजा आणि विधी.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- =====================================================
     WHY US
===================================================== -->

<section id="why-us"
         class="py-24 bg-deepMaroon text-white relative overflow-hidden">

    <div class="absolute w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full -right-40">
    </div>


    <div class="max-w-7xl mx-auto px-5 lg:px-8 relative">

        <div class="grid lg:grid-cols-2 gap-16 items-center">


            <div class="reveal">

                <span class="text-orange-300 font-semibold tracking-[.2em] uppercase text-sm">
                    Why Aaple Guruji
                </span>

                <h2 class="marathi text-4xl lg:text-5xl font-bold mt-5 leading-tight">

                    श्रद्धा पारंपरिक,
                    <span class="text-orange-300">
                        अनुभव आधुनिक.
                    </span>

                </h2>

                <p class="text-white/70 mt-6 leading-8 max-w-xl">

                    आपल्या धार्मिक परंपरांचा आदर राखून
                    आम्ही पूजा आणि धार्मिक सेवांचा अनुभव
                    सोपा, विश्वासार्ह आणि आधुनिक करण्याचा
                    प्रयत्न करतो.

                </p>

            </div>


            <div class="grid sm:grid-cols-2 gap-5">


                <div class="glass bg-white/5 border-white/10 rounded-3xl p-7 reveal">

                    <i data-lucide="shield-check"
                       class="text-orange-300 w-9 h-9">
                    </i>

                    <h3 class="font-bold text-lg mt-5">
                        विश्वासू गुरुजी
                    </h3>

                    <p class="text-white/60 text-sm mt-2">
                        अनुभवी आणि पारंपरिक विधी जाणणारे गुरुजी.
                    </p>

                </div>


                <div class="glass bg-white/5 border-white/10 rounded-3xl p-7 reveal">

                    <i data-lucide="calendar-check"
                       class="text-orange-300 w-9 h-9">
                    </i>

                    <h3 class="font-bold text-lg mt-5">
                        Easy Booking
                    </h3>

                    <p class="text-white/60 text-sm mt-2">
                        धार्मिक सेवांसाठी सोपी booking प्रक्रिया.
                    </p>

                </div>


                <div class="glass bg-white/5 border-white/10 rounded-3xl p-7 reveal">

                    <i data-lucide="languages"
                       class="text-orange-300 w-9 h-9">
                    </i>

                    <h3 class="font-bold text-lg mt-5">
                        आपल्या भाषेत
                    </h3>

                    <p class="text-white/60 text-sm mt-2">
                        स्थानिक भाषेत support आणि संवाद.
                    </p>

                </div>


                <div class="glass bg-white/5 border-white/10 rounded-3xl p-7 reveal">

                    <i data-lucide="heart"
                       class="text-orange-300 w-9 h-9">
                    </i>

                    <h3 class="font-bold text-lg mt-5">
                        परंपरेचा आदर
                    </h3>

                    <p class="text-white/60 text-sm mt-2">
                        प्रत्येक धार्मिक विधीला योग्य महत्त्व.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- =====================================================
     ABOUT
===================================================== -->

<section id="about"
         class="py-24 bg-cream">

    <div class="max-w-7xl mx-auto px-5 lg:px-8">

        <div class="grid lg:grid-cols-2 gap-16 items-center">


            <div class="rounded-[40px] overflow-hidden shadow-2xl reveal">

                <img
                    src="/assets/images/one_click_to_aaple_guruji.jpeg"
                    alt="Traditional Puja"
                    class="w-full h-[550px] object-cover"
                >

            </div>


            <div class="reveal">

                <span class="text-saffron uppercase tracking-[.2em] text-sm font-bold">
                    About Aaple Guruji
                </span>

                <h2 class="marathi text-4xl lg:text-5xl font-bold text-deepMaroon mt-5">

                    आपल्या परंपरांना
                    <br>
                    आधुनिक स्पर्श.

                </h2>

                <p class="text-gray-600 leading-8 mt-6">

                    Aaple Guruji हे आपल्या धार्मिक गरजा
                    अधिक सोप्या पद्धतीने पूर्ण करण्यासाठी
                    तयार केलेले व्यासपीठ आहे.

                </p>

                <p class="text-gray-600 leading-8 mt-4">

                    योग्य गुरुजी, धार्मिक विधी आणि
                    Kundali संबंधित सेवांपर्यंत —
                    तुमच्या श्रद्धेचा प्रवास अधिक सोपा
                    करण्यासाठी आम्ही प्रयत्नशील आहोत.

                </p>


                <a href="#contact"
                   class="inline-flex items-center gap-3 mt-8 bg-deepMaroon text-white px-7 py-4 rounded-full font-semibold">

                    Get Started

                    <i data-lucide="arrow-up-right"></i>

                </a>

            </div>

        </div>

    </div>

</section>


<!-- =====================================================
     CTA
===================================================== -->

<section id="contact"
         class="py-24">

    <div class="max-w-6xl mx-auto px-5">

        <div class="relative overflow-hidden rounded-[40px] bg-deepMaroon text-white p-10 lg:p-20 text-center">


            <div class="absolute w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full -top-40 -left-40">
            </div>

            <div class="absolute w-96 h-96 bg-yellow-500/10 blur-[100px] rounded-full -bottom-40 -right-40">
            </div>


            <div class="relative">

                <div class="text-5xl mb-5">
                    ॐ
                </div>

                <h2 class="marathi text-4xl lg:text-6xl font-bold">

                    तुमच्या शुभ कार्याची
                    <span class="text-orange-300">
                        सुरुवात आजच करा.
                    </span>

                </h2>

                <p class="text-white/70 max-w-2xl mx-auto mt-6">

                    पूजा, धार्मिक विधी किंवा Kundali सेवा —
                    Aaple Guruji तुमच्यासोबत.

                </p>


                <div class="flex flex-wrap justify-center gap-4 mt-9">

                    <a href="tel:9112212165"
                       class="flex items-center gap-3 bg-white text-deepMaroon px-7 py-4 rounded-full font-bold">

                        <i data-lucide="phone"></i>

                        9112212165

                    </a>


                    <a href="https://aapleguruji.in"
                       class="flex items-center gap-3 bg-orange-500 text-white px-7 py-4 rounded-full font-bold hover:bg-orange-600 transition">

                        Visit Website

                        <i data-lucide="external-link"></i>

                    </a>

                </div>

            </div>

        </div>

    </div>

</section>


<!-- =====================================================
     FOOTER
===================================================== -->

<footer class="bg-[#1B0C08] text-white">

    <div class="max-w-7xl mx-auto px-5 lg:px-8 py-14">

        <div class="grid md:grid-cols-4 gap-10">


            <div class="md:col-span-2">

                <img
                    src="/assets/logo.png"
                    alt="Aaple Guruji"
                    class="h-20 w-auto object-contain bg-white rounded-xl p-2"
                >

                <p class="marathi text-white/60 mt-5 max-w-md leading-7">

                    धार्मिक कार्य जेथे,
                    आपले गुरुजी तेथे.

                </p>

            </div>


            <div>

                <h3 class="font-bold mb-5">
                    Quick Links
                </h3>

                <div class="space-y-3 text-white/60 text-sm">

                    <a href="#home" class="block hover:text-white">
                        Home
                    </a>

                    <a href="#services" class="block hover:text-white">
                        Services
                    </a>

                    <a href="#about" class="block hover:text-white">
                        About
                    </a>

                    <a href="#contact" class="block hover:text-white">
                        Contact
                    </a>

                </div>

            </div>


            <div>

                <h3 class="font-bold mb-5">
                    Contact
                </h3>

                <div class="space-y-4 text-white/60 text-sm">

                    <a href="tel:9112212165"
                       class="flex gap-3">

                        <i data-lucide="phone" class="w-4"></i>

                        9112212165

                    </a>

                    <a href="https://aapleguruji.in"
                       class="flex gap-3">

                        <i data-lucide="globe" class="w-4"></i>

                        aapleguruji.in

                    </a>

                </div>

            </div>

        </div>


        <div class="border-t border-white/10 mt-12 pt-7 text-center text-white/40 text-sm">

            © <?php echo date('Y'); ?> Aaple Guruji.
            All rights reserved.

        </div>

    </div>

</footer>


<!-- =====================================================
     SCRIPTS
===================================================== -->

<script>

    lucide.createIcons();

    gsap.registerPlugin(ScrollTrigger);


    /* Navbar */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.classList.add(
                "bg-white/85",
                "backdrop-blur-xl",
                "shadow-sm"
            );

        } else {

            navbar.classList.remove(
                "bg-white/85",
                "backdrop-blur-xl",
                "shadow-sm"
            );

        }

    });


    /* Mobile Menu */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("hidden");

    });


    document.querySelectorAll(".mobile-link").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.add("hidden");

        });

    });


    /* Hero Animation */

    const heroTimeline = gsap.timeline();

    heroTimeline
        .from("#heroContent > *", {

            y: 35,
            opacity: 0,
            duration: .8,
            stagger: .12,
            ease: "power3.out"

        });


    /* Scroll Reveal */

    gsap.utils.toArray(".reveal").forEach(element => {

        gsap.fromTo(
            element,

            {
                opacity: 0,
                y: 50
            },

            {
                opacity: 1,
                y: 0,
                duration: .9,
                ease: "power3.out",

                scrollTrigger: {

                    trigger: element,
                    start: "top 85%",
                    once: true

                }

            }
        );

    });


    /* Service Cards */

    gsap.from(".service-card", {

        y: 50,
        opacity: 0,
        duration: .8,
        stagger: .08,

        scrollTrigger: {

            trigger: "#services",
            start: "top 70%",
            once: true

        }

    });


</script>

</body>
</html>