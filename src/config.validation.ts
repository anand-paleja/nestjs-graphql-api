import { plainToClass } from 'class-transformer';
import { IsDefined, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsDefined()
  @IsString()
  DB_HOST!: string;

  @IsDefined()
  @IsNumber()
  DB_PORT!: number;

  @IsDefined()
  @IsString()
  DB_USERNAME!: string;

  @IsDefined()
  @IsString()
  DB_PASSWORD!: string;

  @IsDefined()
  @IsString()
  DB_NAME!: string;
}


/**
 * Converts the config object into the specified class and implicitly converts property types. 
 * Once converted, it uses the class-validator rules defined in the class to validate.
 * 
 * @param config - config object of env vars 
 */
 export function validate(config: Record<string, unknown>) {
    const validatedConfig: any = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: true });
  
    // if there are errors, throw them
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    
    return validatedConfig;
  }