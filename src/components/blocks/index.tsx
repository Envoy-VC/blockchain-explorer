import React from 'react';
import { Button } from 'antd';
import { publicClient } from '~/providers/web3';

// Components
import { BlockCard } from '~/components/cards';

// Icons
import { PiCube } from 'react-icons/pi';

// Types
import type { Block } from 'viem';

const LatestBlocks = () => {
	const [blocks, setBlocks] = React.useState<Block[]>([]);

	const unwatch = publicClient.watchBlocks({
		blockTag: 'latest',
		onError: (err) => console.log(err),
		onBlock: (block) => onNewBlock(block),
	});

	const onNewBlock = (block: Block) => {
		if (blocks.length < 10) {
			const newBlocks = [block, ...blocks];
			setBlocks(newBlocks);
		} else {
			const newBlocks = [block, ...blocks.slice(0, 5)];
			setBlocks(newBlocks);
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<div className='mx-1 flex items-center justify-between'>
				<div className='flex items-center gap-2 text-slate-700'>
					<PiCube size={22} />
					<div className='text-xl font-medium'>Latest Blocks</div>
				</div>
				<Button type='primary' size='middle' className='bg-primary'>
					View all
				</Button>
			</div>
			<div className='box-shadow scrollbar-hide my-4 flex max-h-[36rem] flex-col gap-2 overflow-hidden rounded-sm border-[1px] border-slate-100 p-4 hover:overflow-y-scroll'>
				{blocks.map((block, index) => (
					<BlockCard key={index} {...block} />
				))}
			</div>
		</div>
	);
};

export default LatestBlocks;
