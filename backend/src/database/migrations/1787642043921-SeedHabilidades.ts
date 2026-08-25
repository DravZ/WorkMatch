import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedHabilidades1787642043921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO habilidades (nombre)
      VALUES
        -- Technology & IT
        ('JavaScript'),
        ('TypeScript'),
        ('React'),
        ('Node.js'),
        ('Python'),
        ('Java'),
        ('SQL'),
        ('Git'),
        ('HTML & CSS'),
        ('Cybersecurity'),

        -- Engineering & Technical
        ('AutoCAD'),
        ('SolidWorks'),
        ('Mechanical Design'),
        ('Electrical Engineering'),
        ('Electronics'),
        ('PLC Programming'),
        ('Industrial Automation'),
        ('3D Modeling'),
        ('Technical Drawing'),
        ('Quality Control'),

        -- Construction & Skilled Trades
        ('Carpentry'),
        ('Welding'),
        ('Masonry'),
        ('Plumbing'),
        ('Painting'),
        ('Electrical Installation'),
        ('Construction Safety'),
        ('Blueprint Reading'),
        ('Tiling'),
        ('Heavy Machinery'),

        -- Healthcare & Wellness
        ('First Aid'),
        ('Nursing'),
        ('Patient Care'),
        ('CPR'),
        ('Medical Assistance'),
        ('Nutrition'),
        ('Physical Therapy'),
        ('Healthcare Administration'),
        ('Pharmacy Assistance'),
        ('Mental Health Support'),

        -- Education & Training
        ('Teaching'),
        ('Lesson Planning'),
        ('Classroom Management'),
        ('Tutoring'),
        ('Educational Technology'),
        ('Curriculum Development'),
        ('Online Teaching'),
        ('Child Education'),
        ('Language Teaching'),
        ('Training & Development'),

        -- Business, Finance & Administration
        ('Accounting'),
        ('Bookkeeping'),
        ('Financial Analysis'),
        ('Microsoft Excel'),
        ('Data Entry'),
        ('Project Management'),
        ('Business Administration'),
        ('Human Resources'),
        ('Payroll'),
        ('Office Management'),

        -- Sales & Customer Service
        ('Sales'),
        ('Customer Service'),
        ('Negotiation'),
        ('Communication'),
        ('Lead Generation'),
        ('Telemarketing'),
        ('CRM Management'),
        ('Complaint Resolution'),
        ('Retail Sales'),
        ('Account Management'),

        -- Marketing, Media & Creative
        ('Digital Marketing'),
        ('Social Media Management'),
        ('Graphic Design'),
        ('Photography'),
        ('Video Editing'),
        ('Copywriting'),
        ('Content Creation'),
        ('Branding'),
        ('SEO'),
        ('Illustration'),

        -- Hospitality, Food & Tourism
        ('Cooking'),
        ('Baking'),
        ('Food Preparation'),
        ('Bartending'),
        ('Waitering'),
        ('Hotel Management'),
        ('Housekeeping'),
        ('Tour Guiding'),
        ('Event Planning'),
        ('Food Safety'),

        -- Transportation & Logistics
        ('Driving'),
        ('Delivery'),
        ('Warehouse Management'),
        ('Inventory Management'),
        ('Forklift Operation'),
        ('Route Planning'),
        ('Logistics'),
        ('Shipping & Receiving'),
        ('Supply Chain Management'),
        ('Fleet Management'),

        -- Retail & Commerce
        ('Merchandising'),
        ('Cashier'),
        ('Point of Sale'),
        ('Inventory Control'),
        ('Store Management'),
        ('Product Knowledge'),
        ('Visual Merchandising'),
        ('Customer Assistance'),
        ('Order Processing'),
        ('E-commerce'),

        -- Security & Public Safety
        ('Security Guard'),
        ('Surveillance'),
        ('Access Control'),
        ('Emergency Response'),
        ('Risk Assessment'),
        ('Fire Safety'),
        ('Crowd Control'),
        ('Crisis Management'),
        ('Security Systems'),
        ('Public Safety'),

        -- Agriculture & Environmental
        ('Farming'),
        ('Gardening'),
        ('Agriculture'),
        ('Crop Management'),
        ('Irrigation'),
        ('Landscaping'),
        ('Pest Control'),
        ('Animal Care'),
        ('Environmental Management'),
        ('Recycling'),

        -- Science & Research
        ('Laboratory Techniques'),
        ('Data Analysis'),
        ('Scientific Research'),
        ('Statistics'),
        ('Biology'),
        ('Chemistry'),
        ('Physics'),
        ('Research Methodology'),
        ('Scientific Writing'),
        ('Laboratory Safety'),

        -- Legal & Government
        ('Legal Research'),
        ('Contract Management'),
        ('Public Administration'),
        ('Document Management'),
        ('Regulatory Compliance'),
        ('Legal Writing'),
        ('Policy Analysis'),
        ('Government Procedures'),
        ('Case Management'),
        ('Public Policy'),

        -- Cleaning & Maintenance
        ('Cleaning'),
        ('Deep Cleaning'),
        ('Maintenance'),
        ('Equipment Maintenance'),
        ('Building Maintenance'),
        ('Lawn Maintenance'),
        ('Pest Control'),
        ('Sanitation'),
        ('Laundry'),
        ('Facility Management'),

        -- Personal & Community Services
        ('Childcare'),
        ('Elderly Care'),
        ('Pet Care'),
        ('Personal Assistance'),
        ('Hairdressing'),
        ('Barbering'),
        ('Beauty Services'),
        ('Community Outreach'),
        ('Event Assistance'),
        ('Home Care'),

        -- Other
        ('Problem Solving'),
        ('Communication'),
        ('Teamwork'),
        ('Time Management'),
        ('Leadership'),
        ('Adaptability'),
        ('Organization'),
        ('Critical Thinking'),
        ('Customer Relations'),
        ('General Assistance');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
  DELETE FROM habilidades
  WHERE nombre IN (
    -- Technology & IT
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'Git',
    'HTML & CSS',
    'Cybersecurity',

    -- Engineering & Technical
    'AutoCAD',
    'SolidWorks',
    'Mechanical Design',
    'Electrical Engineering',
    'Electronics',
    'PLC Programming',
    'Industrial Automation',
    '3D Modeling',
    'Technical Drawing',
    'Quality Control',

    -- Construction & Skilled Trades
    'Carpentry',
    'Welding',
    'Masonry',
    'Plumbing',
    'Painting',
    'Electrical Installation',
    'Construction Safety',
    'Blueprint Reading',
    'Tiling',
    'Heavy Machinery',

    -- Healthcare & Wellness
    'First Aid',
    'Nursing',
    'Patient Care',
    'CPR',
    'Medical Assistance',
    'Nutrition',
    'Physical Therapy',
    'Healthcare Administration',
    'Pharmacy Assistance',
    'Mental Health Support',

    -- Education & Training
    'Teaching',
    'Lesson Planning',
    'Classroom Management',
    'Tutoring',
    'Educational Technology',
    'Curriculum Development',
    'Online Teaching',
    'Child Education',
    'Language Teaching',
    'Training & Development',

    -- Business, Finance & Administration
    'Accounting',
    'Bookkeeping',
    'Financial Analysis',
    'Microsoft Excel',
    'Data Entry',
    'Project Management',
    'Business Administration',
    'Human Resources',
    'Payroll',
    'Office Management',

    -- Sales & Customer Service
    'Sales',
    'Customer Service',
    'Negotiation',
    'Communication',
    'Lead Generation',
    'Telemarketing',
    'CRM Management',
    'Complaint Resolution',
    'Retail Sales',
    'Account Management',

    -- Marketing, Media & Creative
    'Digital Marketing',
    'Social Media Management',
    'Graphic Design',
    'Photography',
    'Video Editing',
    'Copywriting',
    'Content Creation',
    'Branding',
    'SEO',
    'Illustration',

    -- Hospitality, Food & Tourism
    'Cooking',
    'Baking',
    'Food Preparation',
    'Bartending',
    'Waitering',
    'Hotel Management',
    'Housekeeping',
    'Tour Guiding',
    'Event Planning',
    'Food Safety',

    -- Transportation & Logistics
    'Driving',
    'Delivery',
    'Warehouse Management',
    'Inventory Management',
    'Forklift Operation',
    'Route Planning',
    'Logistics',
    'Shipping & Receiving',
    'Supply Chain Management',
    'Fleet Management',

    -- Retail & Commerce
    'Merchandising',
    'Cashier',
    'Point of Sale',
    'Inventory Control',
    'Store Management',
    'Product Knowledge',
    'Visual Merchandising',
    'Customer Assistance',
    'Order Processing',
    'E-commerce',

    -- Security & Public Safety
    'Security Guard',
    'Surveillance',
    'Access Control',
    'Emergency Response',
    'Risk Assessment',
    'Fire Safety',
    'Crowd Control',
    'Crisis Management',
    'Security Systems',
    'Public Safety',

    -- Agriculture & Environmental
    'Farming',
    'Gardening',
    'Agriculture',
    'Crop Management',
    'Irrigation',
    'Landscaping',
    'Pest Control',
    'Animal Care',
    'Environmental Management',
    'Recycling',

    -- Science & Research
    'Laboratory Techniques',
    'Data Analysis',
    'Scientific Research',
    'Statistics',
    'Biology',
    'Chemistry',
    'Physics',
    'Research Methodology',
    'Scientific Writing',
    'Laboratory Safety',

    -- Legal & Government
    'Legal Research',
    'Contract Management',
    'Public Administration',
    'Document Management',
    'Regulatory Compliance',
    'Legal Writing',
    'Policy Analysis',
    'Government Procedures',
    'Case Management',
    'Public Policy',

    -- Cleaning & Maintenance
    'Cleaning',
    'Deep Cleaning',
    'Maintenance',
    'Equipment Maintenance',
    'Building Maintenance',
    'Lawn Maintenance',
    'Pest Control',
    'Sanitation',
    'Laundry',
    'Facility Management',

    -- Personal & Community Services
    'Childcare',
    'Elderly Care',
    'Pet Care',
    'Personal Assistance',
    'Hairdressing',
    'Barbering',
    'Beauty Services',
    'Community Outreach',
    'Event Assistance',
    'Home Care',

    -- Other
    'Problem Solving',
    'Teamwork',
    'Time Management',
    'Leadership',
    'Adaptability',
    'Organization',
    'Critical Thinking',
    'Customer Relations',
    'General Assistance'
  );
`);
    }

}
