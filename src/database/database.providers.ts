import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { News } from '../modules/news/news.model';
import { About } from '../modules/about/about.model';
import { Teacher } from '../modules/teachers/teachers.model';
import { Result } from '../modules/results/results.model';
import { Review } from '../modules/reviews/reviews.model';
import { TeamMember } from '../modules/team/team.model';
import { Vacancy } from '../modules/vacancies/vacancies.model';
import { SocialLink } from '../modules/social-links/social-links.model';
import { Course } from '../modules/course/course.model';
import { CourseApplication } from '../modules/courses/courses.model';
import { QuickQuestion } from '../modules/quick-questions/quick-questions.model';
import { Setting } from '../modules/settings/settings.model';
import { Statistic } from '../modules/statistics/statistics.model';
import { SiteAnalytic } from '../modules/analytics/analytics.model';
import { Admin } from '../modules/auth/admin.model';
import { Testimonial } from '../modules/testimonial/testimonial.model';
import { Hero } from '../modules/hero/hero.model';
import { Visit } from '../modules/visits/visits.model';
import { AboutValue } from '../modules/about-values/about-values.model';
import { TimelineItem } from '../modules/timeline/timeline.model';
import { VideoReview } from '../modules/video-review/video-review.model';
import { FaqItem } from '../modules/faq/faq.model';

export const getDatabaseConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'kamron123'),
  database: configService.get<string>('DB_DATABASE', 'tashkentlaw'),
  models: [
    News,
    About,
    Teacher,
    Result,
    Review,
    TeamMember,
    Vacancy,
    SocialLink,
    Course,
    CourseApplication,
    QuickQuestion,
    Setting,
    Statistic,
    SiteAnalytic,
    Admin,
    Testimonial,
    Hero,
    Visit,
    AboutValue,
    TimelineItem,
    VideoReview,
    FaqItem,
  ],
  autoLoadModels: true,
  synchronize: { alter: { drop: false } },
  logging: false,
});
