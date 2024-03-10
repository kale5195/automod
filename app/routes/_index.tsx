import {
  AuthKitProvider,
  SignInButton,
  StatusAPIResponse,
} from "@farcaster/auth-kit";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback } from "react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { Alert } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { authenticator } from "~/lib/auth.server";
import { getSharedEnv } from "~/lib/utils.server";

// export meta
export const meta: MetaFunction<typeof loader> = (data) => {
  return [
    { title: "automod" },
    {
      property: "og:title",
      content: "automod",
    },
    {
      name: "description",
      content: "Automate channel spam with bots",
    },
    {
      name: "fc:frame",
      content: "vNext",
    },
    {
      name: "og:image",
      content: `${data.data.env.hostUrl}/preview.png`,
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const invite = url.searchParams.get("invite");

  if (code) {
    return await authenticator.authenticate("otp", request, {
      successRedirect: "/~",
      failureRedirect: "/login?error=invalid-otp",
    });
  }

  const user = await authenticator.isAuthenticated(request);

  return typedjson({
    env: getSharedEnv(),
    user,
    invite,
    error,
  });
}

export default function Login() {
  const { user, env, error } = useTypedLoaderData<typeof loader>();

  const farcasterConfig = {
    rpcUrl: `https://optimism-mainnet.infura.io/v3/${env.infuraProjectId}`,
    domain: new URL(env.hostUrl).host.split(":")[0],
    siweUri: `${env.hostUrl}/login`,
  };

  return (
    <AuthKitProvider config={farcasterConfig}>
      <div
        className="h-full w-full flex flex-col items-center justify-center min-h-screen"
        style={{
          backgroundImage:
            "radial-gradient( circle farthest-corner at 10% 20%,  rgba(237,3,32,0.87) 20.8%, rgba(242,121,1,0.84) 74.4% )",
        }}
      >
        <div className="absolute right-5 top-5">
          {user ? (
            <Button
              asChild
              size={"lg"}
              className="no-underline text-white/50"
              variant={"ghost"}
            >
              <Link to="/~">
                Continue <ArrowRight className="inline ml-2 w-4 h-4" />
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              size={"lg"}
              className="no-underline text-white/50"
              variant={"ghost"}
            >
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
        <div className="max-w-xl flex flex-col justify-center items-center">
          <Link to="/~" className="no-underline">
            <h1 className="text-6xl logo text-white opacity-80">automod</h1>
          </Link>
          <h2 className="font-normal mb-8 opacity-50 text-white">
            Enforce channel norms with bots
          </h2>

          {error && (
            <Alert className="mb-8" variant="destructive">
              {error}
            </Alert>
          )}

          {user ? (
            <Button
              asChild
              size={"lg"}
              className="no-underline"
              variant={"secondary"}
            >
              <Link to="/~">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <div className="text-white opacity-60 text-sm">
              Now in private beta.{" "}
              <a
                className="text-white opacity-90 hover:opacity-100 transition-all"
                href="https://tally.so/r/woMkMb"
                target="_blank"
                rel="noreferrer"
              >
                Join the waitlist
              </a>
              <ArrowUpRight className="inline w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </AuthKitProvider>
  );
}
