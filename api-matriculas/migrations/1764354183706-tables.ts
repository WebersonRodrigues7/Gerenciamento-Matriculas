import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1764354183706 implements MigrationInterface {
    name = 'Tables1764354183706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`enrollments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`studentName\` varchar(255) NOT NULL, \`studentEmail\` varchar(255) NOT NULL, \`studentPhone\` varchar(255) NOT NULL, \`birthDate\` varchar(255) NOT NULL, \`studentCpf\` varchar(255) NOT NULL, \`courseId\` int NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`active\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`enrollments\` ADD CONSTRAINT \`FK_60dd0ae4e21002e63a5fdefeec8\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`enrollments\` DROP FOREIGN KEY \`FK_60dd0ae4e21002e63a5fdefeec8\``);
        await queryRunner.query(`DROP TABLE \`course\``);
        await queryRunner.query(`DROP TABLE \`enrollments\``);
    }

}
