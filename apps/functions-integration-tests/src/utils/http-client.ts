import { getFunctionUrl, EMULATOR_CONFIG } from './emulator-config';

interface CallFunctionOptions<T> {
    functionName: string;
    data?: T;
    idToken?: string;
}

export interface FunctionResponse<R> {
    status: number;
    data?: R;
    error?: string;
    raw: unknown;
}

export async function callFunction<RequestData = void, ResponseData = unknown>(
    options: CallFunctionOptions<RequestData>
): Promise<FunctionResponse<ResponseData>> {
    const url = getFunctionUrl(options.functionName);

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Origin: EMULATOR_CONFIG.origin,
    };

    if (options.idToken) {
        headers['Authorization'] = `Bearer ${options.idToken}`;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: options.data ?? {} }),
    });

    const bodyText = await response.text();
    let body: unknown;
    try {
        body = JSON.parse(bodyText);
    } catch {
        body = bodyText;
    }

    const result: FunctionResponse<ResponseData> = {
        status: response.status,
        raw: body,
    };

    if (typeof body === 'object' && body !== null && 'data' in body) {
        result.data = (body as { data: ResponseData }).data;
    }

    if (typeof body === 'object' && body !== null && 'error' in body) {
        result.error = (body as { error: string }).error;
    }

    return result;
}
