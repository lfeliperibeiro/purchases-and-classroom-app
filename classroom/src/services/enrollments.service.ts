import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prima: PrismaService) {}

  getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return this.prima.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  listAllEnrollments() {
    return this.prima.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllEnrollmentsByStudent(studentId: string) {
    return this.prima.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
