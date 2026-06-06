import { ApiResponse } from './utils/api.response';

describe('ApiResponse', () => {
  it('should create a consistent API response shape', () => {
    const response = new ApiResponse<string>({
      data: 'ok',
      message: 'Request completed',
      statusCode: 200,
    });

    expect(response).toEqual({
      data: 'ok',
      message: 'Request completed',
      statusCode: 200,
    });
  });
});
