import { Box, Card, Text,Group } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export default function ProfileCard({onPress, imageSrc,name,classNames, cardType, onDelete}) {
  let color = cardType=='Active'||cardType=='list'?{outline:'#cbcbcbff', text:'black', back:'white'}:cardType=='Pending'?{outline:'#6d6d6dff', text:'black', back:'#cbcbcbff'}:{outline:'#ff6c6cff', text:'#ff6c6cff', back:'#ffc0c0ff'}
  return (
    <Card onClick={onPress} me='1cqw' maw='250px'  style={{ containerType: 'inline-size',width: '30vw', aspectRatio: '16 / 9', backgroundColor:color.back, color:color.text, borderColor:color.outline}} pe='0' withBorder orientation="horizontal">
      {cardType=='list'&&<IconX stroke={2} onClick={onDelete} style={{position:'absolute', top:'5px', right:'5px' }} />
}
      <Group wrap="nowrap">
        <img src={imageSrc} style={{
        width: '35cqw',
        aspectRatio: '1',
        borderRadius: '50%',
        objectFit: 'cover'}}/>

      <Card.Section  px="0" >
        <Box mt="xs" w='60cqw'truncate="end">
        <Text fz="8cqw"  truncate="end">{name}</Text>
        </Box>
        <Box mt="xs" w='60cqw'truncate="end">
          <Text fz="4cqw" truncate="end">{classNames}</Text>
        </Box>

      </Card.Section>
      </Group>
    </Card>
  );
}