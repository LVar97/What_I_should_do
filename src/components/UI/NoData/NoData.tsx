import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { SxProps } from '@mui/material';

interface NoDataProps {
	sx?: SxProps;
}

export const NoData: React.FC<NoDataProps> = ({ sx }: NoDataProps) => (
	<Box sx={sx}>
		<Typography
			textAlign="center"
			sx={{
				color: 'text.disabled',
				display: 'flex',
				fontSize: '20',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				padding: 4,
			}}
			textTransform="uppercase"
		>
			<Inventory2OutlinedIcon sx={{ mx: 3 }} />
			List is empty
		</Typography>
	</Box>
);
