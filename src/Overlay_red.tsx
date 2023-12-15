import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import React, {useMemo} from 'react';
import {loadFont} from '@remotion/google-fonts/Oswald';
import background from '../public/cvrsbgred.png';

import {z} from 'zod';

export const myCompSchema_red = z.object({
	titleText: z.string(),
	subText: z.string(),
	startDelayInSeconds: z.number(),
	endDelayInSeconds: z.number(),
	durationInSeconds: z.number(),
});

export type MyComponentPropsOverlayRed = z.infer<typeof myCompSchema_red>;

const {fontFamily} = loadFont();



const title: React.CSSProperties = {
	fontFamily,
	fontSize: 80,
	fontWeight: 'semiBold',
	color: 'white',
};

const text: React.CSSProperties = {
	fontWeight: 'sembiBold',
	fontFamily,
	fontSize: 80,
	color: 'white',
	marginTop: 0,
};


export const Overlay_red: React.FC<z.infer<typeof myCompSchema_red>> = ({titleText, subText, endDelayInSeconds, startDelayInSeconds}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const disappearBeforeEnd = endDelayInSeconds * 30;
	 const appearAfterStart = Number(startDelayInSeconds * 30);


	const scale = spring({
		fps,
		frame: frame - appearAfterStart,
		config: {
			mass: 0.5,
		},
	});

	const out = spring({
		fps,
		frame: frame - durationInFrames + disappearBeforeEnd,
		config: {
			damping: 200,
		},
		// durationInFrames: disappearBeforeEnd,
	});

	const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);
	const outY = interpolate(out, [0, 1], [0, -500]);
	

	const clip = interpolate((frame - appearAfterStart) * 10, [0, 100], [0, 100]);

	const container: React.CSSProperties = useMemo(() => {
		return {
			position: 'absolute',
			backgroundImage: `url(${background})`,
			borderRadius: 25,
			right: 90,
			top: 90,
			scale: String(scale),
			translate: `0 ${outY}px`,
			rotate: `${rotate}rad`,
			padding: 5,
			paddingLeft: 40,
			paddingRight: 40,
			paddingBottom: 10,
			borderRight: `20px solid #db2323`,
			clipPath: `polygon(0 0, ${String(clip)}% 0, ${clip}% 100%, 0 100%)`,
			opacity: 0.9,
		};
	}, [scale, outY, rotate]);

	return (
		<AbsoluteFill>
			<div style={container}>
				<div style={title}>{titleText}</div>
				<div style={text}>{subText}</div>
			</div>
		</AbsoluteFill>
	);
};
