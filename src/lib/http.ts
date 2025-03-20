import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";

type CustomOptions = RequestInit & { baseURL?: string | undefined };

const ENITY_ERROR_STATUS = 422;

type EnityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
}

//Lỗi dòng mấy file nào cũng có thể xảy ra, nên ta sẽ tạo một class riêng để xử
//lý lỗi này
export class HttpError extends Error {
  status: number;
  paylpad: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number, payload: any }) {
    super('HTTP Error');
    this.status = status;
    this.paylpad = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EnityErrorPayload;
  constructor({ status, payload }: { status: 422, payload: EnityErrorPayload }) {
    super({ status, payload });
    if(status !== ENITY_ERROR_STATUS) {
      throw new Error('EntityError must have status 422');
    }
    this.status = status;
    this.payload = payload;
  }
}
//Khai báo sessionToken, chỉ sử dụng ở phía client
//Khi sử dụng sessionToken, ta sẽ gán giá trị cho nó, sau đó lấy giá trị của nó
class SessionToken {
  private token = '';
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token in server side');
    }
    this.token = token;
  }
}
//Session token này chỉ thực hiện ở phía client, không thực hiện ở phía server
export const clientSessionToken = new SessionToken();

//Hàm request này sẽ thực hiện gửi request lên server
//Hàm này sẽ thực hiện gửi request lên server, nếu có lỗi thì sẽ throw ra lỗi
const request = async<Responst>
  (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : "",
  }

  //Nếu options không có baseURL thì sẽ lấy giá trị từ biến môi trường (env)
  //Nếu có thì sẽ lấy giá trị từ options, truyền vào '' nếu không có giá trị, dồng nghĩa với việc ta gọi API đến NextIS server
  const baseURL = options?.baseURL === undefined ? process.env.NEXT_PUBLIC_API_URL : options.baseURL;

  //Nếu url bắt đầu bằng '/' thì sẽ thêm baseURL vào trước url, nếu không thì sẽ thêm '/' vào giữa baseURL và url
  const fullURL = url.startsWith('/') ? baseURL + url : baseURL + '/' + url;
  const res = await fetch(fullURL, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    method,
    body,
  });

  const payload: Responst = await res.json();
  const data = {
    status: res.status,
    payload,
  }
  if (!res.ok) {
    if(res.status === ENITY_ERROR_STATUS) {
      throw new EntityError(data as { status: 422, payload: EnityErrorPayload });
    } 
    else{
      throw new HttpError(data);
    }
  }
  if (['auth/login', 'auth/register'].includes(url)) {
    clientSessionToken.value = (payload as LoginResType).data.token;
  } else if ('auth/logout'.includes(url)) {
    clientSessionToken.value = '';
  }
  return data;
}

//Hàm http này sẽ thực hiện gửi request lên server
//Hàm này sẽ thực hiện gửi request lên server, nếu có lỗi thì sẽ throw ra lỗi
const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options })
  }
}

export default http;