export const CATEGORIES = [

    {
        id: 'electronics', name: 'Elektronika', subcategories: [
            { id: 'phones', name: 'Mobily' },
            { id: 'laptops', name: 'Notebooky' },
            { id: 'accessories', name: 'Príslušenstvo' }
        ]
    },
    {
        id: 'fashion', name: 'Móda', subcategories: [
            { id: 'men', name: 'Pánske' },
            { id: 'women', name: 'Dámske' },
            { id: 'accessories', name: 'Doplnky' }
        ]
    },
    {
        id: 'home', name: 'Domácnosť', subcategories: [
            { id: 'furniture', name: 'Nábytok' },
            { id: 'decor', name: 'Dekorácie' },
            { id: 'kitchen', name: 'Kuchyňa' }
        ]
    },
    {
        id: 'sports', name: 'Šport', subcategories: [
            { id: 'fitness', name: 'Fitness' },
            { id: 'outdoor', name: 'Outdoor' },
            { id: 'cycling', name: 'Cyklistika' }
        ]
    }
];

export const USERS = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin',
        role: 'admin',
        street: 'Adminová 1',
        city: 'Bratislava',
        zip: '811 01',
        country: 'Slovensko'
    },
    {
        id: 2,
        name: 'Test User',
        email: 'user@example.com',
        password: 'user',
        role: 'user',
        street: 'Užívateľská 5',
        city: 'Košice',
        zip: '040 01',
        country: 'Slovensko'
    }
];

export const PRODUCTS = [
    {
        id: 1,
        name: 'Prémiové Slúchadlá',
        price: 299.99,
        category: 'electronics',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        description: 'Zažite zvuk ako nikdy predtým s našimi najnovšími slúchadlami s potlačením hluku.',
        rating: 4.8,
        reviewCount: 124,
        reviews: [
            { id: 1, user: 'Jožko Mrkvička', rating: 5, comment: 'Úplne super zvuk, odporúčam!', date: '2023-10-15' },
            { id: 2, user: 'Zuzana P.', rating: 4, comment: 'Sú pohodlné, ale baterka by mohla vydržať dlhšie.', date: '2023-11-02' },
            { id: 3, user: 'Peter Nagy', rating: 5, comment: 'Najlepšie slúchadlá aké som mal.', date: '2023-12-01' }
        ]
    },
    {
        id: 2,
        name: 'Smart Hodinky Elite',
        price: 199.50,
        category: 'electronics',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        description: 'Sledujte svoje zdravie a notifikácie štýlovo s hodinkami Elite.',
        rating: 4.6,
        reviewCount: 89,
        reviews: [
            { id: 1, user: 'Martin K.', rating: 5, comment: 'Skvelý dizajn a funkcie.', date: '2023-09-20' },
            { id: 2, user: 'Jana L.', rating: 4, comment: 'Trochu drahé, ale kvalitné.', date: '2023-10-05' }
        ]
    },
    {
        id: 3,
        name: 'Dizajnová Lampa',
        price: 89.00,
        category: 'home',
        subcategory: 'decor',
        image: 'https://images.unsplash.com/photo-1507473888900-52e1adad54cd?w=800&q=80',
        description: 'Minimalistická lampa, ktorá rozžiari každú miestnosť.',
        rating: 4.3,
        reviewCount: 45,
        reviews: []
    },
    {
        id: 4,
        name: 'Bežecké Tenisky Pro',
        price: 120.00,
        category: 'sports',
        subcategory: 'fitness',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        description: 'Maximálne pohodlie a výkon pre vaše každodenné behy.',
        rating: 4.9,
        reviewCount: 203,
        reviews: []
    },
    {
        id: 5,
        name: 'Kožená Brašna',
        price: 150.00,
        category: 'fashion',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        description: 'Ručne šitá kožená brašna pre moderného gentlemana.',
        rating: 4.5,
        reviewCount: 15,
        reviews: []
    },
    {
        id: 6,
        name: 'Analógový Fotoaparát',
        price: 450.00,
        category: 'electronics',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
        description: 'Zachyťte momenty s retro nádychom a modernou kvalitou.',
        rating: 4.7,
        reviewCount: 32,
        reviews: []
    },
    {
        id: 7,
        name: 'Ergonomická Stolička',
        price: 320.00,
        category: 'home',
        subcategory: 'furniture',
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
        description: 'Pracujte pohodlne celé hodiny s našou ergonomickou stoličkou.',
        rating: 4.4,
        reviewCount: 67,
        reviews: []
    },
    {
        id: 8,
        name: 'Joga Podložka',
        price: 35.00,
        category: 'sports',
        subcategory: 'fitness',
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80',
        description: 'Protišmyková podložka pre vaše každodenné cvičenie.',
        rating: 4.8,
        reviewCount: 340,
        reviews: []
    },
    {
        id: 9,
        name: 'Slnečné Okuliare',
        price: 110.00,
        category: 'fashion',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
        description: 'Ochrana a štýl v jednom pre slnečné dni.',
        rating: 4.2,
        reviewCount: 92,
        reviews: []
    },
    {
        id: 10,
        name: 'Kávovar Barista',
        price: 599.00,
        category: 'home',
        subcategory: 'kitchen',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
        description: 'Profesionálna káva v pohodlí vášho domova každé ráno.',
        rating: 4.9,
        reviewCount: 110,
        reviews: []
    },
    {
        id: 11,
        name: 'Fitness Náramok',
        price: 60.00,
        category: 'sports',
        subcategory: 'fitness',
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b2?w=800&q=80',
        description: 'Sledujte svoje kroky, spánok a tep s ľahkosťou.',
        rating: 4.5,
        reviewCount: 280,
        reviews: []
    },
    {
        id: 12,
        name: 'Džínsová Bunda',
        price: 85.00,
        category: 'fashion',
        subcategory: 'women',
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80',
        description: 'Nadčasová klasika, ktorá sa hodí ku všetkému.',
        rating: 4.6,
        reviewCount: 170,
        reviews: []
    },
    // Extra item for specific functionality testing if needed
    {
        id: 13,
        name: 'Bluetooth Reproduktor',
        price: 75.00,
        category: 'electronics',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
        description: 'Malý, ale výkonný reproduktor na cesty.',
        rating: 4.4,
        reviewCount: 56,
        reviews: []
    },
    // New Products (IDs 14-33)
    {
        id: 14,
        name: '4K Akčná Kamera',
        price: 249.00,
        category: 'electronics',
        subcategory: 'outdoor',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
        description: 'Zachyťte každý adrenalínový moment v 4K kvalite.',
        rating: 4.8, reviewCount: 95, reviews: []
    },
    {
        id: 15,
        name: 'Pánsky Kabát Vlna',
        price: 180.00,
        category: 'fashion',
        subcategory: 'men',
        image: 'https://images.unsplash.com/photo-1542272617-08f08630329e?w=800&q=80',
        description: 'Elegantný vlnený kabát do chladných dní.',
        rating: 4.7, reviewCount: 42, reviews: []
    },
    {
        id: 16,
        name: 'Keramická Váza',
        price: 45.00,
        category: 'home',
        subcategory: 'decor',
        image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
        description: 'Ručne robená váza pre vaše obľúbené kvety.',
        rating: 4.5, reviewCount: 18, reviews: []
    },
    {
        id: 17,
        name: 'Basketbalová Lopta',
        price: 30.00,
        category: 'sports',
        subcategory: 'outdoor',
        image: 'https://images.unsplash.com/photo-1519861531473-92002639313a?w=800&q=80',
        description: 'Profesionálna lopta na vonkajšie aj vnútorné ihrisko.',
        rating: 4.6, reviewCount: 120, reviews: []
    },
    {
        id: 18,
        name: 'Tablet Pro 11"',
        price: 799.00,
        category: 'electronics',
        subcategory: 'laptops',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
        description: 'Výkonný tablet pre prácu aj zábavu.',
        rating: 4.9, reviewCount: 310, reviews: []
    },
    {
        id: 19,
        name: 'Letné Šaty Kvetované',
        price: 55.00,
        category: 'fashion',
        subcategory: 'women',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
        description: 'Ľahké a vzdušné šaty na leto.',
        rating: 4.3, reviewCount: 76, reviews: []
    },
    {
        id: 20,
        name: 'Sada Nožov Šéfkuchár',
        price: 129.00,
        category: 'home',
        subcategory: 'kitchen',
        image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80',
        description: 'Kompletná sada pre majstrov v kuchyni.',
        rating: 4.8, reviewCount: 55, reviews: []
    },
    {
        id: 21,
        name: 'Turistický Batoh 60L',
        price: 110.00,
        category: 'sports',
        subcategory: 'outdoor',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        description: 'Veľký batoh na viacdňové túry.',
        rating: 4.7, reviewCount: 88, reviews: []
    },
    {
        id: 22,
        name: 'Herná Myš RGB',
        price: 49.99,
        category: 'electronics',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
        description: 'Presná myš s podsvietením pre hráčov.',
        rating: 4.5, reviewCount: 205, reviews: []
    },
    {
        id: 23,
        name: 'Pánske Hodinky Klasik',
        price: 159.00,
        category: 'fashion',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
        description: 'Elegantné hodinky pre každú príležitosť.',
        rating: 4.6, reviewCount: 44, reviews: []
    },
    {
        id: 24,
        name: 'Vonné Sviečky Sada',
        price: 25.00,
        category: 'home',
        subcategory: 'decor',
        image: 'https://images.unsplash.com/photo-1602825485432-69925c6cc70d?w=800&q=80',
        description: 'Sada troch sviečok s príjemnou vôňou.',
        rating: 4.4, reviewCount: 30, reviews: []
    },
    {
        id: 25,
        name: 'Bežecké Šortky',
        price: 22.00,
        category: 'sports',
        subcategory: 'fitness',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
        description: 'Priedušné šortky na behanie v lete.',
        rating: 4.2, reviewCount: 15, reviews: []
    },
    {
        id: 26,
        name: 'Monitor 27" 4K',
        price: 350.00,
        category: 'electronics',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
        description: 'Krištáľovo čistý obraz pre prácu aj hry.',
        rating: 4.7, reviewCount: 60, reviews: []
    },
    {
        id: 27,
        name: 'Dámska Kabelka Crossbody',
        price: 65.00,
        category: 'fashion',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
        description: 'Štýlová malá kabelka do mesta.',
        rating: 4.5, reviewCount: 22, reviews: []
    },
    {
        id: 28,
        name: 'Posteľné Obliečky Bavlna',
        price: 40.00,
        category: 'home',
        subcategory: 'decor',
        image: 'https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?w=800&q=80',
        description: 'Kvalitné bavlnené obliečky pre dobrý spánok.',
        rating: 4.8, reviewCount: 115, reviews: []
    },
    {
        id: 29,
        name: 'Tenisová Raketa',
        price: 140.00,
        category: 'sports',
        subcategory: 'outdoor',
        image: 'https://images.unsplash.com/photo-1626224583764-84786c713608?w=800&q=80',
        description: 'Ľahká a pevná raketa pre pokročilých.',
        rating: 4.6, reviewCount: 38, reviews: []
    },
    {
        id: 30,
        name: 'Externý HDD 2TB',
        price: 85.00,
        category: 'electronics',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1531492244965-f9694fd6e96f?w=800&q=80',
        description: 'Zálohujte si všetky dáta bezpečne.',
        rating: 4.5, reviewCount: 200, reviews: []
    },
    {
        id: 31,
        name: 'Zimná Čiapka',
        price: 18.00,
        category: 'fashion',
        subcategory: 'accessories',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
        description: 'Teplá čiapka do mrazivého počasia.',
        rating: 4.3, reviewCount: 50, reviews: []
    },
    {
        id: 32,
        name: 'Nástenné Hodiny',
        price: 35.00,
        category: 'home',
        subcategory: 'decor',
        image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80',
        description: 'Moderný dizajn do vašej obývačky.',
        rating: 4.1, reviewCount: 12, reviews: []
    },
    {
        id: 33,
        name: 'Posilňovacia Lavica',
        price: 120.00,
        category: 'sports',
        subcategory: 'fitness',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
        description: 'Domáca lavica pre silový tréning.',
        rating: 4.7, reviewCount: 75, reviews: []
    }
];
