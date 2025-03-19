import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";

type CustomOptions = RequestInit & { baseURL?: string | undefined };

class HttpError extends Error {
    status: number;
    paylpad: any;
    constructor({ status, payload }: { status: number, payload: any }) {
        super('HTTP Error');
        this.status = status;
        this.paylpad = payload;
    }
}

class SessionToken {
  private token = '';
  get value() {
    return this.token;
  }
  set value(token: string) {
    if(typeof window === 'undefined') {
      throw new Error('Cannot set token in server side');
    }
    this.token = token;
  }
}

//Session token này chỉ thực hiện ở phía client, không thực hiện ở phía server

export const clientSessionToken = new SessionToken();

const request = async<Responst>
    (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const baseHeaders = {
        'Content-Type': 'application/json',
        Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : "",
    }
    const baseURL = options?.baseURL === undefined ? process.env.NEXT_PUBLIC_API_URL : options.baseURL;

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
        throw new HttpError(data);
    }
    if (['auth/login', 'auth/register'].includes(url)) {
        clientSessionToken.value = (payload as LoginResType).data.token;
    } else if ('auth/logout'.includes(url)) {
        clientSessionToken.value = '';
    }
    return data;
}

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