import { useState } from "react";
import { Button, Card, Divider, Switch, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function MainForm() {
    const navigate = useNavigate()
  const [vals, setVals] = useState({
    tenses: {
      present: true,
      imperfect: false,
      future: false,
      perfect: false,
      pluperfect: false,
      "future perfect": false,
      clicked: false,
    },
    moods: {
      indicative: true,
      subjunctive: false,
      participle: false,
      infinitive: false,
      clicked: false,
    },
    personNumber: {
      s1: true,
      s2: true,
      s3: true,
      p1: true,
      p2: true,
      p3: true,
      clicked: false,
    },
    voice: {
      active: true,
      passive: false,
      clicked: false,
    },
    conjugation: {
      first: true,
      second: true,
      third: true,
      thirdio: true,
      fourth: true,
      clicked: false,
    },
    macrons: {
      macrons: false,
      clicked: false,
    },
    gender: {
      masculine: true,
      feminine: true,
      neuter: true,
      clicked: false,
    },
  });

  const handleSwitchChange = (category, key, checked) => {
    if (key === "clicked") {
      setVals((prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([name, value]) => [
            name,
            { ...value, clicked: name === category },
          ])
        )
      );
    } else {
      setVals((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: checked,
        },
      }));
    }
  };

  const sections = [
    {
      key: "tenses",
      title: "Tenses",
      options: [
        ["present", "Present"],
        ["imperfect", "Imperfect"],
        ["future", "Future"],
        ["perfect", "Perfect"],
        ["pluperfect", "Pluperfect"],
        ["future perfect", "Future Perfect"],
      ],
    },
    {
      key: "moods",
      title: "Moods",
      options: [
        ["indicative", "Indicative"],
        ["subjunctive", "Subjunctive"],
        ["participle", "Participle"],
        ["infinitive", "Infinitive"],
      ],
    },
    {
      key: "personNumber",
      title: "Person and Number",
      options: [
        ["s1", "First Singular"],
        ["s2", "Second Singular"],
        ["s3", "Third Singular"],
        ["p1", "First Plural"],
        ["p2", "Second Plural"],
        ["p3", "Third Plural"],
      ],
    },
    {
      key: "voice",
      title: "Voice",
      options: [
        ["active", "Active"],
        ["passive", "Passive"],
      ],
    },
    {
      key: "conjugation",
      title: "Conjugation",
      options: [
        ["first", "First"],
        ["second", "Second"],
        ["third", "Third"],
        ["thirdio", "Third io"],
        ["fourth", "Fourth"],
      ],
    },
    {
      key: "macrons",
      title: "Macrons",
      options: [["macrons", "Count Macrons"]],
    },
    {
      key: "gender",
      title: "Gender",
      options: [
        ["masculine", "Masculine"],
        ["feminine", "Feminine"],
        ["neuter", "Neuter"],
      ],
    },
  ];

  return (
    <div>
              <div style={{display:'flex',alignItems: 'flex-start', justifyContent:'center', width: '100%', padding:'20px'}}>

        <Text
                          component="span"
                          variant="gradient"
                          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                          size='10vh'
                          weight={700}
                          style={{ fontFamily: 'Greycliff CF, sans-serif'}}
                          >
                          Synopsis Settings
                          </Text>
                          </div>
                          <div style={{display: 'flex', justifyContent: 'center'}}>
                                                                    <div style={{width:'60vw', alignContent:'center'}}>
                                                                            <Divider my="md" size="md"/>
                                                                            </div>
                                                                            </div>
      <div
        id="optionsForm"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {sections.map((section) => (
          <div key={section.key} style={{ marginBottom: "12px" }}>
            <div
              onClick={() =>
                handleSwitchChange(section.key, "clicked", true)
              }
              style={{
                height: "5vh",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <Text fz="20px" fw={500}>
                {section.title}
              </Text>
            </div>

            {vals[section.key].clicked && (
              <Card
                id={section.key}
                style={{
                  width: "40%",
                  margin: "0 auto",
                  backgroundColor: "#dfdfdf",
                  alignItems:'center'
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                  }}
                >
                  {section.options.map(([key, label]) => (
                    <Switch
                      key={key}
                      checked={vals[section.key][key]}
                      onChange={(event) =>
                        handleSwitchChange(
                          section.key,
                          key,
                          event.currentTarget.checked
                        )
                      }
                      label={label}
                    />
                  ))}
                </div>
              </Card>
            )}
          </div>
        ))}

        <Button style={{position:'fixed', bottom:'20px', right:'20px', zIndex:100000}} onClick={()=>{navigate('/synopsis',{state:{vals:vals}})}}>Next<IconChevronRight stroke={2}/></Button>
      </div>
    </div>
  );
}