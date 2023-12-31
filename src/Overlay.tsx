import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import React, {useMemo} from 'react';
import {loadFont} from '@remotion/google-fonts/Oswald';
import background from './assets/cvrsbg.png';

import {z} from 'zod';

export const myCompSchema = z.object({
	titleText: z.string(),
	subText: z.string(),
});

const {fontFamily} = loadFont();



const title: React.CSSProperties = {
	fontFamily,
	fontSize: 80,
	fontWeight: 'semiBold',
	color: 'white',
};

const text: React.CSSProperties = {
	fontWeight: 100,
	fontFamily,
	fontSize: 60,
	color: 'white',
	marginTop: 0,
};

const disappearBeforeEnd = 20;

export const Overlay: React.FC<z.infer<typeof myCompSchema>> = ({titleText, subText}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const scale = spring({
		fps,
		frame,
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
		durationInFrames: disappearBeforeEnd,
	});

	const rotate = interpolate(out, [0, 1], [0, -Math.PI / 20]);
	const outY = interpolate(out, [0, 1], [0, -500]);

	const clip = interpolate(frame * 10, [0, 100], [0, 100]);

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
			borderLeft: `20px solid #db2323`,
			clipPath: `polygon(0 0, ${String(clip)}% 0, ${clip}% 100%, 0 100%)`,
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
