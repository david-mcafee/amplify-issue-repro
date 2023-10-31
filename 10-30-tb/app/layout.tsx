import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@aws-amplify/adapter-nextjs";
import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
import { Inter } from "next/font/google";
import Link from "next/link";
import "@/styles/globals.css";
import { cookies } from "next/headers";
import SignOut from "@/components/SignOut";

const inter = Inter({ subsets: ["latin"] });

// Amplify.configure(awsconfig as any)

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {

  const authSession = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => {
      return fetchAuthSession(contextSpec)
    }
  })

  return (
    <html lang="en">
      <body>
        <ConfigureAmplifyClientSide/>
        <div
          className={`flex flex-col min-h-screen max-w-6xl mx-auto py-4 text-base ${inter.className}`}
        >
          <nav className="flex justify-between py-1 px-2 bg-orange-400 text-black">
            <div className="flex gap-2 items-center">
              <Link className="border-black border-2" href="/">
                <h1 className="px-2">orange site</h1>
              </Link>
              <Link className="hover:underline" href="/post/new">
                new post
              </Link>
            </div>
            {authSession.tokens &&
              <div className="flex gap-2 justify-center items-center">
                {authSession.tokens?.idToken?.payload?.email as string}
                <SignOut />
              </div>
            }
          </nav>
          <div className="flex flex-col gap-4 py-4 px-2 bg-stone-50">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
