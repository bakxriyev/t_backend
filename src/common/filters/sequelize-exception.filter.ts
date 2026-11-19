import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { BaseError, DatabaseError, ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from 'sequelize';

/**
 * Turns database errors caused by bad input (too long, duplicate, wrong type,
 * missing reference) into a clear 400/409 for the admin panel instead of a bare 500.
 */
@Catch(BaseError)
export class SequelizeExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Database');

  catch(exception: BaseError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof UniqueConstraintError) {
      status = HttpStatus.CONFLICT;
      message = `Bu qiymat allaqachon mavjud: ${exception.errors.map((e) => e.path).join(', ')}`;
    } else if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.errors.map((e) => e.message).join('; ');
    } else if (exception instanceof ForeignKeyConstraintError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Bog‘langan yozuv topilmadi';
    } else if (exception instanceof DatabaseError) {
      const code = (exception.parent as { code?: string } | undefined)?.code;
      if (code === '22001') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Kiritilgan matn juda uzun';
      } else if (code === '22P02' || code === '22003' || code === '22007') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Noto‘g‘ri formatdagi qiymat kiritildi';
      }
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) this.logger.error(exception.message, exception.stack);
    res.status(status).json({ statusCode: status, message, error: HttpStatus[status] });
  }
}
