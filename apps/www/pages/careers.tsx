import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { GlobeAltIcon } from '@heroicons/react/outline'
import { Check } from 'lucide-react'
import { Badge, Button, Separator, buttonVariants, cn } from 'ui'
import ReactMarkdown from 'react-markdown'
import Styles from '~/styles/career.module.css'

import Globe from '~/components/Globe'
import DefaultLayout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'

import career from '~/data/career.json'

export async function getStaticProps() {
  const job_res = await fetch('https://api.ashbyhq.com/posting-api/job-board/supabase')
  const job_data = await job_res.json()

  const contributor_res = await fetch(
    'https://api.github.com/repos/supabase/supabase/contributors?per_page=100'
  )
  const contributor_arr = await contributor_res.json()

  const contributor_data = await contributor_arr.map(
    (contributor: { login: string; avatar_url: string; html_url: string }) => {
      return {
        login: contributor.login,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
      }
    }
  )

  const contributors = await contributor_data.filter((contributor: any) =>
    career.contributors.includes(contributor.login)
  )

  contributors.push(
    {
      login: 'XquisiteDreamer',
      avatar_url: 'https://pbs.twimg.com/profile_images/1475874191249399808/H6TPHpq7_400x400.png',
      html_url: 'https://twitter.com/XquisiteDreamer',
    },
    {
      login: 'marijanapav',
      avatar_url: 'https://avatars.githubusercontent.com/u/46031252?v=4',
      html_url: 'https://github.com/marijanapav',
    },
    {
      login: 'lyqht',
      avatar_url: 'https://pbs.twimg.com/profile_images/1665778877837504514/4SWgLpjA_400x400.png',
      html_url: 'https://twitter.com/estee_tey',
    },
    {
      login: 'ghostdevv',
      avatar_url: 'https://avatars.githubusercontent.com/u/47755378?v=4',
      html_url: 'https://github.com/ghostdevv',
    }
  )

  if (!job_data && !contributors) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  return {
    props: {
      jobs: job_data.jobs,
      contributors: contributors,
    },
  }
}

const PLACEHOLDER_JOB_ID = '64d76968-1fe1-458c-8c6d-8859168c3fb7'
const filterGenericJob = (job: JobItemProps) => job.id === PLACEHOLDER_JOB_ID

const CareerPage: NextPage = ({ jobs, contributors }: any) => {
  const { basePath } = useRouter()

  const meta_title = 'Careers | Supabase'
  const meta_description = 'Help build software developers love'

  return (
    <>
      <NextSeo
        title={meta_title}
        description={meta_description}
        openGraph={{
          title: meta_title,
          description: meta_description,
          url: `https://supabase.com/careers`,
          images: [
            {
              url: `https://supabase.com${basePath}/images/career/careers_og.jpg`,
            },
          ],
        }}
      />
      <DefaultLayout>
        <div className="text-foreground">
          <div className="container relative mx-auto px-6 py-10 lg:pt-12 lg:px-16 xl:px-20 text-center space-y-4">
            <h1 className="text-sm text-brand md:text-base">
              <span className="sr-only">Supabase </span>Careers
            </h1>
            <h2 className="text-3xl md:text-4xl xl:text-5xl lg:max-w-2xl xl:max-w-3xl lg:mx-auto tracking-[-1.5px]">
              We're on a mission to build the best developer platform
            </h2>
            <p className="text-sm md:text-base text-foreground-lighter max-w-sm sm:max-w-md md:max-w-lg mx-auto">
              Explore remote possibilities and join our team to help us achieve it.
            </p>
            <div className="mt-4">
              <a href="#positions">
                <Button type="primary">Open positions</Button>
              </a>
            </div>
          </div>

          <SectionContainer>
            <div className="flex flex-wrap md:flex-nowrap -mt-6 md:mt-0 w-fit md:w-full mx-auto md:flex md:items-start justify-around lg:w-full lg:max-w-5xl">
              {career.company.map((company: { number: string; text: string }, i: number) => {
                return (
                  <div
                    key={i}
                    className="border-t-[1px] mt-6 mx-2 md:mx-2 md:mt-0 md:border-0 border-brand w-[134px] md:max-w-none"
                  >
                    <div className="hidden md:block border-t-[1px] lg:border-t-2 border-brand w-[60px] lg:w-[100px]"></div>
                    <h2 className="text-3xl lg:text-4xl pt-3 tracking-[-1.5px]">
                      {company.number}
                    </h2>
                    <ReactMarkdown className="text-foreground-light text-sm lg:text-base">
                      {company.text}
                    </ReactMarkdown>
                  </div>
                )
              })}
            </div>
          </SectionContainer>

          <div className="py-[1.25px] bg-gradient-to-r from-background via-border to-background">
            <div className="bg-alternative overflow-clip">
              <SectionContainer className="md:!pt-16 md:grid md:max-h-[500px] grid-cols-1 md:grid-cols-5 md:gap-8">
                <div
                  className="
                    relative md:col-span-2 aspect-square
                    w-[calc(100%+100px)] md:w-[calc(100%+450px)] xl:w-[calc(100%+200px)]
                    -mb-[160px] md:mb-0
                    -top-[160px] md:-top-[200px] xl:-top-[210px]
                    -left-[100px] md:-left-[450px] xl:-left-[200px]
                  "
                >
                  <Globe />
                </div>
                <div className="relative md:col-span-3">
                  <h2 className="text-2xl sm:text-3xl xl:text-4xl max-w-[300px] md:max-w-xs tracking-[-1.5px]">
                    We work together, wherever we are
                  </h2>
                  <p className="text-foreground-light mt-4 text-xs sm:text-sm md:text-base md:w-full">
                    Working in a globally distributed team is rewarding but has its challenges. We
                    are across many different timezones, so we use tools like Notion, Slack, and
                    Discord to stay connected to our team, and our community.
                  </p>
                  <div className="max-w-[300px] sm:max-w-md md:max-w-md mt-20">
                    <div className="border-t-2 border-brand w-4/12"></div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl pt-2 tracking-[-1.5px]">
                      We deeply believe in the efficacy of collaborative open source
                    </h2>
                  </div>
                </div>
              </SectionContainer>

              <SectionContainer className="-mt-16 md:mt-16">
                <div className="md:flex md:gap-6">
                  <div className="md:w-1/2">
                    <div>
                      <h2 className="text-2xl sm:text-3xl xl:text-4xl tracking-[-1.5px]">
                        What is Supabase
                      </h2>
                      <p className="text-foreground-light text-xs sm:text-sm lg:text-base pt-2 sm:max-w-md xl:max-w-lg">
                        Supabase is an open source Firebase alternative, built by developers for
                        developers. Supabase adds auth, realtime, storage, restful APIs, and edge
                        functions to Postgres without a single line of code. Supabase was
                        born-remote. Having a globally distributed, open source company is our
                        secret weapon to hiring top-tier talent.
                      </p>
                    </div>
                    <div className="md:w-full rounded-md mt-10 md:mt-36 lg:mt-40">
                      <div className="relative w-full aspect-[148/125]">
                        <Image
                          src="/images/career/1.jpg"
                          alt="team photo"
                          fill
                          sizes="(min-width: 767px) 45vw, 100vw"
                          placeholder="blur"
                          blurDataURL="/images/blur.png"
                          className="rounded-md object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="grid justify-items-end">
                      <div className="w-full md:w-5/6 rounded-md mt-6">
                        <div className="relative w-full aspect-[29/22]">
                          <Image
                            src="/images/career/2.jpg"
                            alt="team photo"
                            fill
                            sizes="(min-width: 767px) 45vw, 100vw"
                            placeholder="blur"
                            blurDataURL="/images/blur.png"
                            className="rounded-md object-cover"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 w-full md:w-1/2">
                    <div className="w-full rounded-md">
                      <div className="relative w-full aspect-[137/110]">
                        <Image
                          src="/images/career/3.jpg"
                          alt="team photo"
                          fill
                          sizes="(min-width: 767px) 45vw, 100vw"
                          placeholder="blur"
                          blurDataURL="/images/blur.png"
                          className="rounded-md object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="flex gap-6 mt-6">
                      <div className="w-full rounded-md">
                        <div className="relative w-full aspect-[142/189]">
                          <Image
                            src="/images/career/4.jpg"
                            alt="team photo"
                            fill
                            sizes="(min-width: 767px) 45vw, 100vw"
                            placeholder="blur"
                            blurDataURL="/images/blur.png"
                            className="rounded-md object-cover"
                            draggable={false}
                          />
                        </div>
                      </div>
                      <div className="w-full rounded-md">
                        <div className="relative w-full aspect-[142/189]">
                          <Image
                            src="/images/career/5.jpg"
                            alt="team photo"
                            fill
                            sizes="(min-width: 767px) 45vw, 100vw"
                            placeholder="blur"
                            blurDataURL="/images/blur.png"
                            className="rounded-md object-cover"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full rounded-md mt-6">
                      <div className="relative w-full aspect-[16/9]">
                        <Image
                          src="/images/career/6.jpg"
                          alt="team photo"
                          fill
                          sizes="(min-width: 767px) 45vw, 100vw"
                          placeholder="blur"
                          blurDataURL="/images/blur.png"
                          className="rounded-md object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SectionContainer>

              <SectionContainer>
                <h2 className="text-2xl sm:text-3xl xl:text-4xl tracking-[-1.5px]">
                  Human powered
                </h2>
                <p className="text-foreground-lighter text-xs sm:text-sm lg:text-base pt-3 sm:w-3/5 lg:max-w-sm">
                  As a completely remote and asynchronous team, we focus on these five traits to
                  keep our team effective:
                </p>
                <div className="grid pt-10 gap-8 grid-cols-2 md:grid-cols-3 lg:gap-16 lg:grid-cols-5">
                  {career.humanPowered.map(
                    (human: { icon: string; title: string; text: string }, i: number) => {
                      return (
                        <div key={i} className="flex flex-col gap-3">
                          <div>
                            <h2 className="text-base">{human.title}</h2>
                            <p className="text-foreground-light text-xs lg:text-sm">{human.text}</p>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </SectionContainer>

              <SectionContainer className="!pb-0">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl xl:text-4xl max-w-[300px] xl:max-w-none mx-auto tracking-[-1.5px]">
                    1,000 + Contributors building Supabase
                  </h2>
                  <p className="text-foreground-light text-xs sm:text-sm lg:text-base sm:max-w-lg lg:max-w-2xl mx-auto pt-3">
                    We're building a community of communities, bringing together developers from
                    many different backgrounds, as well as new developers looking to get involved
                    with open source. We love celebrating everyone who contributes their time to the
                    Supabase mission.
                  </p>
                </div>
                <div className="w-[1080px] h-[370px] mx-auto sm:mt-10 md:mt-16 lg:mt-28 2xl:mt-60">
                  {contributors.map((contributor: any, i: number) => {
                    return (
                      <div
                        className={`${
                          Styles[`contributors-${i}`]
                        } absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-[1.5px] border-default z-10
                          transition-all hover:scale-105 drop-shadow-sm hover:drop-shadow-md
                        `}
                        key={i}
                      >
                        <Link href={contributor.html_url} target="_blank">
                          <div className="relative w-full h-full">
                            <Image
                              src={contributor.avatar_url}
                              alt={`${contributor.login} github avatar`}
                              fill
                              sizes="(min-width: 767px) 45vw, 100vw"
                              placeholder="blur"
                              blurDataURL="/images/blur.png"
                              className="rounded-full object-cover"
                              draggable={false}
                            />
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                  <div
                    className={`${Styles['contributors-bg-circle']} w-[100%] lg:w-[80%] left-[0%] lg:left-[10%] -bottom-[30%] xs:-bottom-[36%] sm:-bottom-[52%] md:-bottom-[64%] lg:-bottom-[80%] xl:-bottom-[100%]`}
                  >
                    <div className="flex flex-col justify-between h-full bg-alternative rounded-full p-4"></div>
                  </div>
                  <div
                    className={`${Styles['contributors-bg-circle']} w-[80%] lg:w-[60%] left-[10%] lg:left-[20%] -bottom-[25%] xs:-bottom-[30%] sm:-bottom-[44%] md:-bottom-[54%] lg:-bottom-[60%] xl:-bottom-[75%]`}
                  >
                    <div className="flex flex-col justify-between h-full bg-alternative rounded-full p-4"></div>
                  </div>
                  <div
                    className={`${Styles['contributors-bg-circle']} w-[60%] lg:w-[40%] left-[20%] lg:left-[30%] -bottom-[20%] xs:-bottom-[25%] sm:-bottom-[38%] md:-bottom-[44%] lg:-bottom-[40%] xl:-bottom-[50%]`}
                  >
                    <div className="flex flex-col justify-between h-full bg-alternative rounded-full p-4"></div>
                  </div>
                  <div
                    className={`${Styles['contributors-bg-circle']} w-[40%] lg:w-[20%] left-[30%] lg:left-[40%] -bottom-[15%] xs:-bottom-[19%] sm:-bottom-[30%] md:-bottom-[34%] lg:-bottom-[20%] xl:-bottom-[25%]`}
                  >
                    <div className="flex flex-col justify-between h-full bg-alternative rounded-full p-4"></div>
                  </div>
                </div>
              </SectionContainer>
            </div>
          </div>

          <SectionContainer>
            <div className="xl:flex lg:items-start xl:gap-10 justify-between">
              <div className="xl:min-w-[300px] xl:max-w-[400px]">
                <h2 className="text-2xl sm:text-3xl xl:text-4xl max-w-[280px] sm:max-w-xs xl:max-w-none tracking-[-1.5px]">
                  Great people deserve great benefits
                </h2>
              </div>
              <div className="mt-12 xl:mt-0 space-y-6 lg:space-y-0 sm:w-fit sm:mx-auto lg:grid lg:grid-cols-2 lg:gap-16">
                {career.benefits.map(
                  (benefits: { icon: string; title: string; text: string }, i: number) => {
                    return (
                      <div className="h-full flex items-start space-x-6 w-full" key={i}>
                        <div className="h-fit text-sm lg:text-base">
                          <h2 className="text-sm">{benefits.title}</h2>
                          <ReactMarkdown className="prose pt-1 text-sm">
                            {benefits.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          </SectionContainer>

          <SectionContainer>
            <div className="text-center sm:max-w-md md:w-3/4 lg:max-w-lg xl:max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl xl:text-4xl tracking-[-1.5px]">How we hire</h2>
              <p className="text-xs sm:text-sm lg:text-base text-foreground-light pt-3">
                The entire process is fully remote and all communication happens over email or via
                video chat in Google Meet. The calls are all 1:1 and usually take between 20-45
                minutes. We know you are interviewing us too, so please ask questions. We are happy
                to answer.
              </p>
            </div>
            <div className="mt-16 md:ml-36 lg:flex lg:items-start lg:w-fit lg:mx-auto">
              {career.hiring.map((hiring: { title: string; text: string }, i: number) => {
                return (
                  <div
                    key={i + 1}
                    className="flex lg:block items-start space-x-6 lg:space-x-0 lg:w-full"
                  >
                    <div className="lg:flex items-center">
                      <h3 className="bg-brand-400 border-[1px] border-brand-300 text-brand-600 text-md text-center w-[44px] px-2 py-1.5 rounded-md">
                        {i + 1}
                      </h3>
                      <div className="h-[100px] w-[1px] sm:h-[100px] mx-auto lg:h-[1px] lg:w-full bg-brand-500 lg:pr-6"></div>
                    </div>
                    <div className="lg:mt-6">
                      <h2 className="sm:text-lg max-w-[75%] xl:max-w-none xl:w-11/12 lg:max-w-none">
                        {hiring.title}
                      </h2>
                      <p className="text-foreground-light text-xs sm:text-sm mt-1 md:w-3/4 lg:w-11/12">
                        {hiring.text}
                      </p>
                    </div>
                  </div>
                )
              })}
              <h3 className="bg-brand-400 border-[1px] border-brand-300 text-brand-600 text-xl w-[44px] lg:min-w-[40px] min-h-[40px] px-2 py-1 rounded-md grid justify-items-center items-center">
                <Check />
              </h3>
            </div>
          </SectionContainer>

          <Separator />

          <div id="positions" className="max-w-6xl mx-auto">
            <SectionContainer>
              <h2 className="text-xl sm:text-3xl xl:text-3xl tracking-[-1.5px] mb-3">
                Open positions
              </h2>
              <p className="max-w-xl text-foreground-lighter">
                Want to build the best developer platform?
                <br /> We’d love to talk to you.
              </p>
              <div className="mt-10 -space-y-px">
                {jobs
                  .filter((job: any) => !filterGenericJob(job))
                  .map((job: JobItemProps) => (
                    <JobItem job={job} key={job.id} />
                  ))}
              </div>
              <div className="mt-10 -space-y-px">
                {jobs.filter(filterGenericJob).map((job: JobItemProps) => (
                  <JobItem job={job} key={job.id} />
                ))}
              </div>
            </SectionContainer>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

interface JobItemProps {
  id: string
  title: string
  location: any
  employment: string
  descriptionHtml: string
  jobUrl: string
}

const JobItem: React.FC<{ job: JobItemProps }> = ({ job }) => {
  const isPlaceholderJob = job.id === PLACEHOLDER_JOB_ID

  return (
    <Link
      href={job.jobUrl}
      className="
        first-of-type:rounded-t-md last-of-type:rounded-b-md
        cursor-pointer md:cursor-default bg-surface-75 border border-muted drop-shadow-sm p-4 px-7
        flex flex-col md:flex-row
        md:items-center
        transition hover:bg-surface-100
        hover:cursor-pointer
      "
      target="_blank"
    >
      <h2 className="text-base min-w-[240px] lg:min-w-[316px] sm:truncate mr-6">{job.title}</h2>
      <div className="flex justify-between justify-[normal] pt-2 md:pt-0 w-full items-center">
        <div className="flex items-center space-x-4">
          <Badge className="bg-surface-200 bg-opacity-100 border-muted" variant={'default'}>
            <GlobeAltIcon className="w-3 h-3" />

            <span className="ml-1">{job.location}</span>
          </Badge>
          <span className="hidden md:block">{job.employment}</span>
        </div>
        <div className={cn(buttonVariants({ type: 'default', size: 'tiny' }), 'rounded-full')}>
          {isPlaceholderJob ? 'Submit resume' : 'Apply for position'}
        </div>
      </div>
    </Link>
  )
}

export default CareerPage
