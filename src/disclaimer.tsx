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

export const disclaimerSchema = z.object({
	disclaimerText: z.string(),
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
	fontSize: 50,
	maxWidth: '80%',
	color: 'white',
	marginTop: 0,
	textAlign: 'center',
};

const disappearBeforeEnd = 30;

export const Disclaimer: React.FC<z.infer<typeof disclaimerSchema>> = ({disclaimerText	}) => {
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
// write a fade out animation for the disclaimer
	const outY = interpolate(out, [0, 1], [1, 0]);




	const container: React.CSSProperties = useMemo(() => {
		return {
			position: 'absolute',
			backgroundImage: `url(${background})`,
			borderRadius: 25,
			right: 0,
			top: 0,
			left: 0,
			bottom: 0,
			padding: 5,
			paddingLeft: 40,
			paddingRight: 40,
			paddingBottom: 10,
			opacity: outY,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		};
	}, [outY]);

	return (
		<AbsoluteFill>
			<div style={container}>
				<div style={text}>{disclaimerText}</div>
			</div>
		</AbsoluteFill>
	);
};
