import Link from 'next/link';
import React from 'react';
import type { Block } from 'viem';

// Helpers
import { getTimeAgo } from '~/utils';

const BlockCard = ({
	number,
	transactions,
	timestamp,
	gasUsed,
	miner,
}: Block) => {
	return (
		<div className='mt-2 flex flex-col gap-4'>
			<div className='flex flex-col sm:items-center sm:justify-between sm:flex-row gap-1'>
				<div className='flex flex-col gap-1'>
					<Link
						className='text-primary opacity-85 text-sm'
						href={`https://etherscan.com/block/${number?.toString()}`}
						rel='noopener noreferrer'
						target='_blank'
					>
						Block #{number?.toString()}
					</Link>
					<span className='text-xs font-semibold text-slate-400'>
						{getTimeAgo(timestamp.toString())}
					</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-sm'>
						Mined by{' '}
						<span className='text-primary opacity-85 cursor-pointer'>
							{miner.slice(0, 25)}...
						</span>
					</span>
					<span className='text-xs font-semibold text-slate-400'>
						{transactions?.length} txns
					</span>
				</div>

				<div className='rounded-md bg-slate-200 px-2 py-[1px] text-xs text-gray-500 w-fit'>
					{(parseInt(gasUsed.toString()) / 10 ** 9).toFixed(4)} ETH
				</div>
			</div>
			<div className='w-full border-t-[1px] border-gray-300' />
		</div>
	);
};

export default BlockCard;
