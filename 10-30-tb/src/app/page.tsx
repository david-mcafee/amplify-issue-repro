import Link from "next/link";
import { Amplify } from "aws-amplify";
const config = require("../../amplifyconfiguration.json");

Amplify.configure(config);

export default function Page({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Link href="/repro1">repro1</Link>
      {children}
    </section>
  );
}
