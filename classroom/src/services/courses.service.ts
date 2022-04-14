import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prima: PrismaService) {}

  listAllCourses() {
    return this.prima.course.findMany();
  }

  getCourseById(id: string) {
    return this.prima.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const courseAlreadyExists = await this.prima.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists');
    }

    return this.prima.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
