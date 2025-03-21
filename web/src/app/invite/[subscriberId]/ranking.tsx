import Image from 'next/image'

import { getRanking } from '@/http/api'
import cooper from '../../../assets/medal-cooper.svg'
import gold from '../../../assets/medal-gold.svg'
import silver from '../../../assets/medal-silver.svg'

export default async function Ranking() {
  const { ranking } = await getRanking()

  return (
    <div className="w-full max-w-[440px] space-y-5">
      <h2 className="text-gray-200 text-xl font-semibold font-heading leading-none">
        Ranking de indicações
      </h2>
      <div className="space-y-4">
        {ranking.map((subscriber, index) => {
          const position = index + 1 // the members are sorted, with index based-zero
          return (
            <div
              key={subscriber.id}
              className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3"
            >
              <span className="text-sm text-gray-300 leading-none">
                <span className="font-semibold">{position}</span>|{' '}
                {subscriber.name}
              </span>
              <span className="font-heading text-2xl font-semibold text-gray-200  leading-none">
                {subscriber.score}
              </span>
              {index === 0 && (
                <Image
                  src={gold}
                  alt="gold medal"
                  className="absolute top-0 right-8"
                />
              )}
              {index === 1 && (
                <Image
                  src={silver}
                  alt="gold medal"
                  className="absolute top-0 right-8"
                />
              )}
              {index === 2 && (
                <Image
                  src={cooper}
                  alt="gold medal"
                  className="absolute top-0 right-8"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
