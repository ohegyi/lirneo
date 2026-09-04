import { Box, Card, Text,Group } from '@mantine/core';
import biologyImg from './biology.jpg'
import chemistryImg from './chemistry.jpg'
import chineseImg from './chinese.jpg'
import csImg from './computer science.jpg'
import englishImg from './english.png'
import frenchImg from './french.jpg'
import greekImg from './greek.jpg'
import historyImg from './history.jpg'
import latinImg from './latin.jpg'
import mathImg from './math.jpg'
import physicsImg from './physics.jpg'
import spanishImg from './spanish.jpg'

export default function ClassCard({className,subject,nature=false, avatar_url=false}) {
    let subjects = subject.split('|')
    
  let color = avatar_url || nature=='private' ? {outline:'#cbcbcbff', text:'black', back:'white'}:{outline:'#636363ff', text:'black', back:'#cbcbcbff'}
    const images={
        'biology':biologyImg,
        'ecology':biologyImg,
        'chemistry': chemistryImg,
        'chinese': chineseImg,
        'computer science': csImg,
        'english': englishImg,
        'french':frenchImg,
        'greek':greekImg,
        'history':historyImg,
        'latin':latinImg,
        'math':mathImg,
        'physics':physicsImg,
        'spanish':spanishImg
    }
  return (
    <Card maw='250px' padding="0" style={{ containerType: 'inline-size',width: '30vw', aspectRatio: '16 / 9', backgroundColor:color.back, color:color.text, borderColor:color.outline}} withBorder orientation="horizontal">
      <Group wrap="nowrap" w="100%" h="100%" gap="0">
        {subjects.map((subj,index)=>(
            <div
  key={index}
  style={{
    height: '100%',
    margin: 0,
    width: `${50 / subjects.length}cqw`,
    overflow: 'hidden',
    flexShrink: 0,
  }}
>
  <img
    src={images[subj]}
    style={{
      height: '100%',
      width: 'auto',
      display: 'block',
      maxWidth: 'none',
    }}
  />
</div>
        ))}
      <Card.Section  width='100%' padding="0" px="0" >
        {avatar_url &&  <Box w='50cqw'truncate="end" style={{position:'absolute',
        bottom:'2%',
        left:'52%',display:'flex'}}>
           {avatar_url &&  <img src={avatar_url}
            style={{
        width: '10cqw',
        height: '10cqw',
        borderRadius: '50%',
        objectFit: 'cover'}}/>}
        <Text fz="6cqw"  truncate="end">{className}</Text>
        </Box>}
        {!avatar_url&& <Box w='50cqw'truncate="end">
    
        <Text fz="6cqw"  truncate="end">{className}</Text>
        </Box>}
       
        {nature && <Box w='40cqw'truncate="end">
          <Text fz="4cqw" c='dimmed'>{nature}</Text>
        </Box>}
        
      </Card.Section>
      </Group>
    </Card>
  );
}