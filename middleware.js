// frontend/middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  console.log("Middleware - Token:", token);

  if (request.nextUrl.pathname === "/") {
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret);
        const userType = payload.user_type;
        console.log("Middleware - Decoded User Type at /:", userType);
        return NextResponse.redirect(
          new URL(
            userType === "type_1" ? "/type_1_home" : "/type_2_home",
            request.url
          )
        );
      } catch (error) {
        console.log("Middleware - JWT Verification Error at /:", error);
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    console.log("Middleware - No token found, redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userType = payload.user_type;
    console.log("Middleware - Decoded User Type:", userType);

    if (
      userType === "type_1" &&
      !request.nextUrl.pathname.startsWith("/type_1_home")
    ) {
      return NextResponse.redirect(new URL("/type_1_home", request.url));
    }
    if (
      userType === "type_2" &&
      !request.nextUrl.pathname.startsWith("/type_2_home")
    ) {
      return NextResponse.redirect(new URL("/type_2_home", request.url));
    }

    return NextResponse.next(); // No need to modify the request
  } catch (error) {
    console.log("Middleware - JWT Verification Error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/type_1_home", "/type_2_home"],
};
