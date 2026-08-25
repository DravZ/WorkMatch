import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategoriaVacante1787594683636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO categoria_vacante (id_categoria, nombre)
            VALUES
                (1, 'Technology & IT'),
                (2 ,'Engineering & Technical'),
                (3 ,'Construction & Skilled Trades'),
                (4 ,'Healthcare & Wellness'),
                (5 ,'Education & Training'),
                (6 ,'Business, Finance & Administration'),
                (7 ,'Sales & Customer Service'),
                (8 ,'Marketing, Media & Creative'),
                (9 ,'Hospitality, Food & Tourism'),
                (10 ,'Transportation & Logistics'),
                (11 ,'Retail & Commerce'),
                (12 ,'Security & Public Safety'),
                (13 ,'Agriculture & Environmental'),
                (14 ,'Science & Research'),
                (15 ,'Legal & Government'),
                (16 ,'Cleaning & Maintenance'),
                (17 ,'Personal & Community Services'),
                (18 ,'Other');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM categoria_vacante
            WHERE nombre IN (
                'Technology & IT',
                'Engineering & Technical',
                'Construction & Skilled Trades',
                'Healthcare & Wellness',
                'Education & Training',
                'Business, Finance & Administration',
                'Sales & Customer Service',
                'Marketing, Media & Creative',
                'Hospitality, Food & Tourism',
                'Transportation & Logistics',
                'Retail & Commerce',
                'Security & Public Safety',
                'Agriculture & Environmental',
                'Science & Research',
                'Legal & Government',
                'Cleaning & Maintenance',
                'Personal & Community Services',
                'Other'
            );
        `);
  }
}
