import jwt from "jsonwebtoken";
import { env } from "@/env";

export interface NewJwtReturnObject {
  token ?: string;
  statusCode: 0 | 1;
}

export interface VerifyJwtReturnObject {
  isValid?: boolean;
  statusCode: 0 | 1;
}

export function newJwt(
  // eslint-disable-next-line
  payload: any
): NewJwtReturnObject {
  try {
    // eslint-disable-next-line
    const token = jwt.sign(payload, env.JWT_SECRET);
    return { token: token, statusCode: 0 }
  } catch(e) {
    console.log('[JWT_UTILS_ERROR]', e);
    return { statusCode: 1 }
  }
}

export function verifyJwt(
  token: string
): VerifyJwtReturnObject {
  try {
    const verify = jwt.verify(token, env.JWT_SECRET);
    if (verify) {
      return { isValid: true, statusCode: 0 }
    }
    return { isValid: false, statusCode: 0 }
  } catch(e) {
    console.log('[JWT_UTILS_ERROR]', e);
    return { statusCode: 1 }
  }
}