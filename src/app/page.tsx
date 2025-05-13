import { ExternalLinkIcon, Link2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ruzolutImg from "~/assets/img/ruzolut.png";
import { HydrateClient } from "~/trpc/server";
import { Button } from "./_components/ui/button";
import WaitlistForm from "./_components/waitlist-form";
import { projects } from "./_data/projects";

export default function Home() {
  return (
    <HydrateClient>
      <main className="bg-background flex h-full min-h-screen w-full p-5">
        <div className="grid min-h-full w-full grid-cols-12 gap-5">
          <div className="col-span-12 flex h-full flex-col justify-between gap-6 md:col-span-5 lg:col-span-3">
            <div className="flex shrink flex-col gap-2">
              <div className="flex shrink flex-col">
                <Link href="/" className="inline-flex w-fit flex-col">
                  <span className="flex text-sm font-black tracking-wider uppercase">{`\\(\` 0´)/`}</span>
                  <h1 className="-mt-1.5 flex text-2xl font-black">
                    Angry
                    <span className="ms-0.5 inline-flex tracking-wide">
                      OSS
                    </span>
                  </h1>
                </Link>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/angryoss/core"
                  className="-mt-0.5 w-fit text-sm font-medium text-lime-500 hover:underline"
                >
                  ./core
                </a>
              </div>
              <p className="text-muted-foreground text-sm sm:max-w-[360px]">
                We’re tired of being milked by corporates. AngryOSS is where
                anger turns into tools, coins, chains, and platforms — owned by
                no one, built for everyone.
              </p>
              <WaitlistForm />
            </div>
          </div>
          <div className="col-span-12 h-full md:col-span-7 lg:col-span-6">
            <div className="col-span-1 mb-5 flex flex-col gap-0.5 sm:col-span-2">
              <h2 className="text-md font-bold">Project list</h2>
              <p className="text-muted-foreground max-w-[300px] text-sm">
                Every single one of the projects we launch is completely open
                source.
              </p>
            </div>
            <ul className="grid w-full grid-cols-1 place-content-start gap-x-4 gap-y-3.5 sm:grid-cols-2">
              {projects.map((proj) => (
                <li
                  key={proj.name}
                  className="col-span-1 flex flex-col justify-between"
                >
                  <div className="flex w-full flex-col">
                    <div className="relative flex flex-row flex-wrap items-center gap-2">
                      <div className="absolute end-2 top-[5px]">
                        {proj.status === "live" ? (
                          <div className="h-[5px] w-[5px] overflow-hidden rounded-full bg-green-500"></div>
                        ) : proj.status === "wip" ? (
                          <div className="h-[5px] w-[5px] animate-pulse overflow-hidden rounded-full bg-yellow-500"></div>
                        ) : (
                          <div className="h-[5px] w-[5px] overflow-hidden rounded-full bg-neutral-500/30"></div>
                        )}
                      </div>
                      <div className="flex flex-col gap-[1px]">
                        <h2 className="text-sm leading-[100%] font-bold">
                          {proj.name}
                        </h2>
                        <p className="text-sm font-medium">{proj.package}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      {proj.description}
                    </p>
                  </div>
                  <div className="mt-1 flex w-full flex-row flex-wrap justify-end gap-2 md:pe-2">
                    {proj.links
                      .filter(
                        (link) =>
                          proj.status === "live" || link.label === "GitHub",
                      )
                      .map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:text-lime-500"
                        >
                          [
                          <span className="inline-flex items-center gap-1">
                            {link.label}{" "}
                            <Link2Icon className="size-4 stroke-[2.5px]" />
                          </span>
                          ]
                        </a>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 flex h-full flex-col justify-between md:col-span-6 lg:col-span-3">
            <div className="flex flex-col"></div>
            <div className="flex w-full flex-col gap-6">
              <div className="col-span-1 flex flex-col gap-0.5 sm:col-span-2">
                <h2 className="text-md font-bold">Initiator</h2>
                <div className="mb-1 flex w-full max-w-[80px]">
                  <a
                    href="http://github.com/ruzolut"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={ruzolutImg}
                      className="w-full overflow-hidden rounded-[4px] border-[1px] border-neutral-500/25"
                      alt="Ruzolut"
                    />
                  </a>
                </div>

                <p className="text-muted-foreground text-sm">
                  AngryOSS is sparked by{" "}
                  <a
                    href="https://github.com/ruzolut"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="link"
                      variant="link"
                      className="gap-1 underline hover:text-lime-500 [&_svg]:size-3 [&_svg]:stroke-[3px]"
                      endIcon={<ExternalLinkIcon />}
                    >
                      Ruzolut
                    </Button>
                  </a>
                  , a relentless builder with a grudge against corporate greed
                  and a passion for open, uncensored tools. Ruzolut believes in
                  using technology to flip the script — creating powerful,
                  open-source solutions that anyone can use, adapt, or
                  challenge.
                </p>
              </div>
              <div className="flex w-full flex-col gap-0.5">
                <h2 className="text-md font-bold">Follow AngryOSS.</h2>
                <p className="text-muted-foreground text-sm">
                  We have official accounts on
                </p>
                <div className="mt-1 flex w-full flex-row flex-wrap gap-2">
                  <a
                    href="http://x.com/angryoss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-lime-500"
                  >
                    [X / Twitter]
                  </a>
                  <a
                    href="http://github.com/angryoss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-lime-500"
                  >
                    [GitHub]
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
