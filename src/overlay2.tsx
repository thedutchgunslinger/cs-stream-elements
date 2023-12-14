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
import cross from './assets/cross.png';

import {z} from 'zod';

export const myCompSchema2 = z.object({
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

export const Overlay2: React.FC<z.infer<typeof myCompSchema2>> = ({
	titleText,
	subText,
}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	let scale: any;
	let clip: number;

	if (frame < 20) {
		scale = spring({
			fps,
			frame,
			config: {
				mass: 0.5,
			},
		});

		clip = interpolate(frame * 10, [0, 100], [100, 0]);
	}
	// reverse the scale for the last 20 frames
	else {
		scale = spring({
			fps,
			frame: durationInFrames - disappearBeforeEnd - frame,
			config: {
				mass: 0.5,
			},
		});

		// clip = interpolate(frame * 10 + 30, [0, 100], [0, 100]);
	}   
	const out = spring({
		fps,
		frame: frame - durationInFrames + disappearBeforeEnd,
		config: {
			damping: 200,
		},
		durationInFrames: disappearBeforeEnd,
	});

	const outY = interpolate(out, [0, 1], [0, -500]);

	// rotate fast in the beginning, then slow down but keep rotating slowley
	let rotate: number;
    let rotate2: number;

	rotate = frame * 0.01;
	rotate2 = frame * -0.01;

	const container: React.CSSProperties = useMemo(() => {
		return {
			position: 'absolute',
			backgroundImage: `url(${background})`,
			borderRadius: 25,
			right: 200,
			top: 90,
			scale: String(scale),
			translate: `0 ${outY}px`,
			// rotate: `${rotate}rad`,
			padding: 5,
			paddingLeft: 40,
			paddingRight: 40,
			paddingBottom: 10,
			transformOrigin: 'center right',
			borderLeft: `20px solid #db2323`,
			clipPath: `polygon(${String(clip)}% 0, 100% 0, 100% 100%, ${String(
				clip
			)}% 100%)`,
            opacity: 0.9,
		};
	}, [scale, outY, rotate]);

	const crossStyle: React.CSSProperties = useMemo(() => {
		return {
			height: 100,
			width: 100,
			position: 'absolute',
			top: 150,
			right: 120,
			scale: String(scale * 3.5),
			transform: `rotate(${rotate2}rad)`,
		};
	}, [scale, outY, rotate2]);
	const crossStyle2: React.CSSProperties = useMemo(() => {
		return {
			height: 100,
			width: 100,
			position: 'absolute',
			top: 150,
			right: 170,
			scale: String(scale * 3.5),
			transform: `rotate(${rotate}rad)`,
		};
	}, [scale, outY, rotate]);

	return (
		<AbsoluteFill>
			<img src={cross} style={crossStyle} alt="" />
			<img src={cross} style={crossStyle2} alt="" />
			{/* <div style={crossStyle}></div> */}
			<div style={container}>
				<div style={title}>{titleText}</div>
				<div style={text}>{subText}</div>
			</div>
		</AbsoluteFill>
	);
};
