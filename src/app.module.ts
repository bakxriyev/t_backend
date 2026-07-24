import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { getDatabaseConfig } from './database/database.providers';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { NewsModule } from './modules/news/news.module';
import { AboutModule } from './modules/about/about.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ResultsModule } from './modules/results/results.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TeamModule } from './modules/team/team.module';
import { VacanciesModule } from './modules/vacancies/vacancies.module';
import { SocialLinksModule } from './modules/social-links/social-links.module';
import { CoursesModule } from './modules/courses/courses.module';
import { CourseModule } from './modules/course/course.module';
import { QuickQuestionsModule } from './modules/quick-questions/quick-questions.module';
import { SettingsModule } from './modules/settings/settings.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { UploadModule } from './modules/upload/upload.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { SeoModule } from './modules/seo/seo.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { HeroModule } from './modules/hero/hero.module';
import { VisitsModule } from './modules/visits/visits.module';
import { AboutValuesModule } from './modules/about-values/about-values.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { VideoReviewModule } from './modules/video-review/video-review.module';
import { FaqModule } from './modules/faq/faq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(process.cwd(), configService.get<string>('UPLOAD_DIR', './uploads')),
          serveRoot: '/uploads',
          serveStaticOptions: { index: false },
        },
      ],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ], 

    }),
    AuthModule,
    NewsModule,
    AboutModule,
    TeachersModule,
    ResultsModule,
    ReviewsModule,
    TeamModule,
    VacanciesModule,
    SocialLinksModule,
    CourseModule,
    CoursesModule,
    QuickQuestionsModule,
    SettingsModule,
    StatisticsModule,
    AnalyticsModule,
    UploadModule,
    TelegramModule,
    SeoModule,
    TestimonialModule,
    HeroModule,
    VisitsModule,
    AboutValuesModule,
    TimelineModule,
    VideoReviewModule,
    FaqModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}