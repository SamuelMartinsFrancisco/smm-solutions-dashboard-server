import request from 'supertest';
import { afterEach, beforeEach, expect } from 'vitest';
import app from '../app.js';
import * as services from '../services/courses.service.js';
import { mockCoursesList, mockCourse } from '../utils/tests/mocks.js';
import { BadRequestError, NotFoundError } from '../utils/errorHandlers.js';

vi.mock('../services/courses.service.js', () => ({
  getAllCourses: vi.fn(),
  getCourse: vi.fn(),
  addCourse: vi.fn(),
  updateCourse: vi.fn(),
  deleteCourse: vi.fn()
}));

const courseId = {
  moreThanEightCharLong: 'abcdefgHi3',
  lessThanEightCharLong: '123zf'
}

describe('Courses Controller Tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  })

  describe('GET operation', () => {
    it('should return status 200 for successful recovery of all courses', async () => {
      services.getAllCourses.mockReturnValueOnce(mockCoursesList);

      const res = await request(app).get('/api/courses')

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(mockCoursesList);
    });

    it('should handle internal error', async () => {
      services.getAllCourses.mockRejectedValueOnce(new Error());

      const res = await request(app)
        .get('/api/courses');

      expect(res.statusCode).toBe(500);
      expect(res.body).toStrictEqual({ "error": "some error ocurred in our side while processing your request" })
    });

    it('should return status 200 for successful recovery of a single course', async () => {
      services.getCourse.mockReturnValueOnce(mockCoursesList[0]);

      const res = await request(app)
        .get('/api/courses/valid-id');

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(mockCoursesList[0]);
    });

    it('should return status 404 when course is not found', async () => {
      services.getCourse.mockRejectedValueOnce(new NotFoundError("sorry, the course you're looking for was not found"));

      const res = await request(app)
        .get('/api/courses/valid-id');

      expect(res.statusCode).toBe(404);
      expect(res.body).toStrictEqual({ "error": "sorry, the course you're looking for was not found" });
    });

    it('should return status 400 for an invalid course id', async () => {
      await request(app)
        .get(`/api/courses/${courseId.moreThanEightCharLong}`)
        .expect(400);

      await request(app)
        .get(`/api/courses/${courseId.lessThanEightCharLong}`)
        .expect(400);
    });
  });

  describe('POST operation', () => {
    it('should return status 201 for successful course creation', async () => {
      services.addCourse.mockReturnValueOnce(mockCourse);

      const res = await request(app)
        .post('/api/courses')
        .send(mockCourse)

      expect(res.statusCode).toBe(201);
      expect(res.body).toStrictEqual(mockCourse);
    })

    it('should return status 400 for invalid request body data', async () => {
      const res = await request(app)
        .post('/api/courses')
        .send({ ...mockCourse, title: 100 })

      expect(res.statusCode).toBe(400);
      expect(res.body).toStrictEqual({
        "error": "invalid data",
        "details": [
          {
            "field": "title",
            "justification": "This field is required, and must be a non-empty string",
          },
        ]
      });
    })
  })

  describe('PATCH operation', () => {
    it('should return status 200 for successful course update', async () => {
      const responseCourseUpdate = {
        ...mockCoursesList[0],
        title: 'Edited course title',
      }
      services.updateCourse.mockReturnValueOnce(responseCourseUpdate);

      const res = await request(app)
        .patch('/api/courses/valid-id')
        .send({ title: 'Edited course title' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(responseCourseUpdate);
    })

    it('should return status 400 invalid request data', async () => {
      services.updateCourse.mockRejectedValueOnce(new BadRequestError('invalid request'));

      const res = await request(app)
        .patch('/api/courses/valid-id')
        .send({ unknown_field: '...' })

      expect(res.statusCode).toBe(400);
      expect(res.body).toStrictEqual({ "error": "invalid request" });
    })
  })

  describe('DELETE operation', () => {
    it('should return 204 for successful course deletion', async () => {
      services.deleteCourse.mockReturnValueOnce(true);

      await request(app)
        .delete('/api/courses/valid-id')
        .expect(204)
    });
  })

  describe('Expected return for common errors', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    })

    it('should return status 500 for unknown errors', async () => {
      const defaultErrorMessage = { "error": "some error ocurred in our side while processing your request" };

      services.getAllCourses.mockRejectedValueOnce(new Error());
      services.getCourse.mockRejectedValueOnce(new Error());
      services.addCourse.mockRejectedValueOnce(new Error());
      services.updateCourse.mockRejectedValueOnce(new Error());
      services.deleteCourse.mockRejectedValueOnce(new Error());

      await request(app)
        .get('/api/courses')
        .expect((req) => {
          expect(req.statusCode).toBe(500);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .get('/api/courses/valid-id')
        .expect((req) => {
          expect(req.statusCode).toBe(500);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .post('/api/courses')
        .send(mockCourse)
        .expect((req) => {
          expect(req.statusCode).toBe(500);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .patch('/api/courses/valid-id')
        .send({ title: 'edited' })
        .expect((req) => {
          expect(req.statusCode).toBe(500);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .delete('/api/courses/valid-id')
        .expect((req) => {
          expect(req.statusCode).toBe(500);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });
    })

    it('should return status 400 for invalid id', async () => {
      const defaultErrorMessage = {
        "error": "invalid data",
        "details": [
          {
            "field": "id",
            "justification": "This parameter is required and must be an 8-character string",
          },
        ]
      };

      await request(app)
        .get(`/api/courses/${courseId.lessThanEightCharLong}`)
        .expect((req) => {
          expect(req.statusCode).toBe(400);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .get(`/api/courses/${courseId.moreThanEightCharLong}`)
        .expect((req) => {
          expect(req.statusCode).toBe(400);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .patch(`/api/courses/${courseId.lessThanEightCharLong}`)
        .send({ title: 'edited' })
        .expect((req) => {
          expect(req.statusCode).toBe(400);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .patch(`/api/courses/${courseId.moreThanEightCharLong}`)
        .send({ title: 'edited' })
        .expect((req) => {
          expect(req.statusCode).toBe(400);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .delete( `/api/courses/${courseId.lessThanEightCharLong}`)
        .expect((req) => {
          expect(req.statusCode).toBe(400);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });

      await request(app)
        .delete(`/api/courses/${courseId.moreThanEightCharLong}`)
        .expect((req) => {
          expect(req.statusCode).toBe(400);
          expect(req.body).toStrictEqual(defaultErrorMessage);
        });
    })

    it('should return status 404 for not found courses', async () => {
      const errorMessage = 'course not found';
      const errorResponse = { "error": errorMessage };

      services.getCourse.mockRejectedValueOnce(new NotFoundError(errorMessage));
      services.updateCourse.mockRejectedValueOnce(new NotFoundError(errorMessage));
      services.deleteCourse.mockRejectedValueOnce(new NotFoundError(errorMessage));

      await request(app)
        .get('/api/courses/valid-id')
        .expect((req) => {
          expect(req.statusCode).toBe(404);
          expect(req.body).toStrictEqual(errorResponse);
        });

      await request(app)
        .patch('/api/courses/valid-id')
        .send({ title: 'edited' })
        .expect((req) => {
          expect(req.statusCode).toBe(404);
          expect(req.body).toStrictEqual(errorResponse);
        });

      await request(app)
        .delete('/api/courses/valid-id')
        .expect((req) => {
          expect(req.statusCode).toBe(404);
          expect(req.body).toStrictEqual(errorResponse);
        });
    })
  })
});