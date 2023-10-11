import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPasswordToUser1696848807636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE user ADD COLUMN password varchar(80)`); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      // await queryRunner,query(`ALTER TABLE user DROP COLUMN password;`);
        await queryRunner.dropColumn('user', 'password');
    }

}

