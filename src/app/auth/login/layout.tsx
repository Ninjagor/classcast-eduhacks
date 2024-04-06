import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/utils/jwt";

export const metadata = {
  title: "ClassCast | Login",
  description: "ClassCast - Educate Hacks '24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {    
    const cookieStore = cookies();
    if (cookieStore.get('token') && (verifyJwt(cookieStore.get('token')!.value).isValid)) {
        redirect('/portal');
    }
  return (
    <>
        {children}
        <div className="flex gap-1 items-center justify-center w-full px-8 mt-9">
            <p>Don&apos;t have an account?</p>
            <Link href="/auth/signup" className="text-orange-600 hover:underline">Sign up.</Link>
        </div>
    </>
  );
}
