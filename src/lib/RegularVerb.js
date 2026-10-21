export default class RegularVerb {
  number = 0;
  person = 0;
  gender = 0;
  tense = 0;
  mood = 0;
  pres1 = "";
  form = "";
  infinative = "";
  perf1 = "";
  ppp1 = "";
  ending = "";
  macron = 0;
  stem = "";
  voice=0;
  indicLetter=""
  subjuncLetter=""
  constructor(p1, i, p2, pp2, p, n, g, t, m,v,mac){
    this.number = n;
    this.person = p;
    this.gender = g;
    this.pres1 = p1;
    this.infinative = i; 
    this.perf1 = p2;
    this.ppp1 = pp2;
    this.tense = t;
    this.mood = m;
    this.voice = v;
    this.macron = mac==1;
    this.ending="";
    this.indicLetter="";
    this.subjuncLetter="";
  }
  macronify(letter){
    if(this.macron==1){switch(letter){
        case "a":
            return "ā";
        case "ba":
            return "bā";
        case "e":
            return "ē";
        case "i":
            return "ī";
        case "ie":
            return "iē";
        case "era":
            return "erā";
        case "eri":
            return "erī";
        case "isse":
            return "issē";
        case "":
            return "";
    }}else{
        return letter
    }
  }
  decideMacronify(letter){
    if (this.person<2 && this.number==1 || this.person==1 && this.number==0){
        return this.macronify(letter)
    }
    else if (this.person==3 && this.number==0 && this.voice==1){
        return this.macronify(letter)
    }
    else{
        return letter;
    }
  }
  findEndings(){
    let regEndings = [[["m","s","t"], ["mus","tis","nt"]],[["r","ris","tur"], ["mur","minī","ntur"]]];
    let perfectEndings = [this.macron?[["ī","istī","it"], ["imus","istis","erunt"]]:[["i","isti","it"], ["imus","istis","erunt"]],[[" sum"," es"," est"], [" sumus"," estis"," sunt"]]];
    let pluperfectEndings = [[["m","s","t"], ["mus","tis","nt"]],this.macron?[[" eram"," erās"," erat"], [" erāmus"," erātis"," erant"]]:[[" eram"," eras"," erat"], [" eramus"," eratis"," erant"]]];
    let futurePerfectEndings = [[["ō","s","t"], ["mus","tis","nt"]],[[" ero"," eris"," erit"], [" erimus"," eritis"," erunt"]]];
    let perfectSubjunctiveEndings = [[["m","s","t"], ["mus","tis","nt"]],this.macron?[[" sim"," sīs"," sit"], [" sīmus"," sītis"," sint"]]:[[" sim"," sīs"," sit"], [" sīmus"," sītis"," sint"]]];
    let pluperfectSubjunctiveEndings = [[["m","s","t"], ["mus","tis","nt"]],this.macron?[[" essem"," essēs"," esset"], [" essēmus"," essētis"," essent"]]:[[" essem"," esses"," esset"], [" essemus"," essetis"," essent"]]];
    let futMids=[["a","e", "e"],["e","e","e"]]
    let futEnds12=[["bo","bis", "bit"],["bimus","bitis","bunt"]]
    let pluperfectIndicMids = [[["era","era","era"], ["era","era","era"]],[["","",""], ["","",""]]];
    let futPerfectIndicMids = [[["eri","eri","eri"], ["eri","eri","eri"]],[["","",""], ["","",""]]];
    let futPerfectIndicMids1 = [[["er","eri","eri"], ["eri","eri","eri"]],[["","",""], ["","",""]]];
    let pluperSubjuncMids = [[["isse","isse","isse"], ["isse","isse","isse"]],[["","",""], ["","",""]]];
    let endings=[[[this.macronify(this.indicLetter)+"ns",this.macronify(this.indicLetter)+"ns",this.macronify(this.indicLetter)+"ns"],["us", "a", "um"],this.macron?["ūrus", "ūra", "ūrum"]:["urus", "ura", "urum"], [this.macronify(this.indicLetter)+"ndus",this.macronify(this.indicLetter)+"nda", this.macronify(this.indicLetter)+"ndum"]],[[this.macron?this.macronify(this.indicLetter)+"ntēs":this.indicLetter+"ntes",this.macron?this.macronify(this.indicLetter)+"ntēs":this.indicLetter+"ntes",this.macronify(this.indicLetter)+"ntia"],["ī", "ae", "a"],this.macron?["ūrī", "ūrae", "ūra"]:["uri", "urae", "ura"], [this.macron?this.macronify(this.indicLetter)+"ndī":this.macronify(this.indicLetter)+"ndi",this.macronify(this.indicLetter)+"ndae", this.macronify(this.indicLetter)+"nda"]]]
    //if perfect indicative
    if (this.mood==0){
        if (this.tense==0){
            this.ending=this.decideMacronify(this.indicLetter)+regEndings[this.voice][this.number][this.person]
        }
        else if (this.tense==1){
            this.ending=this.indicLetter+this.decideMacronify("ba")+regEndings[this.voice][this.number][this.person]
        }
        else if (this.tense==2){
            if (this.conjugation<3){
                if (this.person==0 && this.number==0){
                    let es=["bo", "bor"]
                    this.ending=this.indicLetter+es[this.voice]
                }
                else{
                this.ending=this.decideMacronify(this.indicLetter)+"bi"+regEndings[this.voice][this.number][this.person]
                }
            }
            else{
                this.ending=this.decideMacronify(futMids[this.number][this.person])+regEndings[this.voice][this.number][this.person]
            }
        }
        else if (this.tense==3){
            this.ending=perfectEndings[this.voice][this.number][this.person]
        }
        else if (this.tense==4){
            this.ending=this.decideMacronify(pluperfectIndicMids[this.voice][this.number][this.person])+pluperfectEndings[this.voice][this.number][this.person]
        }
        else{
            this.ending=this.decideMacronify(futPerfectIndicMids1[this.voice][this.number][this.person])+futurePerfectEndings[this.voice][this.number][this.person]
        }
        if (this.person==0 && this.number==0 && this.voice==0 && this.tense==0){
            this.ending="ō"
        }
    }
    else if (this.mood==1){
        if (this.tense==0){
            this.ending=this.decideMacronify(this.subjuncLetter)+regEndings[this.voice][this.number][this.person]
        }
        else if (this.tense==1){
            this.ending=this.decideMacronify("e")+regEndings[this.voice][this.number][this.person]
        }
        else if (this.tense==2){
            this.ending=this.decideMacronify(futPerfectIndicMids[this.voice][this.number][this.person])+perfectSubjunctiveEndings[this.voice][this.number][this.person]
        }
        else{
            this.ending=this.decideMacronify(pluperSubjuncMids[this.voice][this.number][this.person])+pluperfectSubjunctiveEndings[this.voice][this.number][this.person]
        }
    }
    else if (this.mood==2){
        if (this.voice==1){
            this.ending=endings[this.number][3][this.gender]
        }
        else{
        this.ending=endings[0][this.tense][this.gender]
        }
    }
    else if (this.mood==3){
        let infinEndings=this.macron?[[this.infinative.substring(this.infinative.length-3),"ī"],["isse"," esse"],[" esse", "um irī"]]:[[this.infinative.substring(this.infinative.length-3),"i"],["isse"," esse"],[" esse", "um iri"]]
        this.ending=infinEndings[this.tense][this.voice]
    }
    else{
        let imperEnd=["","te"]
        if (this.conjugation<3){
            this.ending=this.indicLetter+imperEnd[this.number]
        }
        else{
            this.ending = "i"+imperEnd[this.number]
        }
        }
    }
  findStem(){
    const val1=this.infinative.substring(0, this.infinative.length-3)
    const val2=this.perf1.substring(0, this.perf1.length-1);
    let participleEndings=[["us","a","um"],["i","ae","a"]]
    let val3 = this.ppp1.substring(0,this.ppp1.length-2)+participleEndings[this.number][this.gender];
    if (this.mood==0){
        let stems=[[val1,val1,val1,val2,val2,val2],[val1,val1,val1,val3,val3,val3]]
        this.stem=stems[this.voice][this.tense]
    }
    else if (this.mood==1){
        let stems=[[val1,this.infinative.substring(0, this.infinative.length-1),val2,val2],[val1,this.infinative.substring(0, this.infinative.length-1),val3,val3,val3]]
        this.stem=stems[this.voice][this.tense]
    }
    else if (this.mood==2){
        const papStem=this.infinative.substring(0, this.infinative.length-3)
        const fppStem = this.presentStem;
        const pppStem = this.ppp1.substring(0,this.ppp1.length-2);
        let stems=[papStem,pppStem,pppStem]
        this.stem=stems[this.tense]
    }
    else if (this.mood==3){
        let val4=""
        const val1=this.infinative.substring(0,this.infinative.length-3)
        if (this.voice==1){
            if (this.conjugation < 3 || this.conjugation > 4){
                val4 = this.infinative.substring(0,this.infinative.length-1)
              }
              else{
                val4 = this.infinative.substring(0,this.infinative.length-3)
              }
        }
        let stems=[[val1,val4],[val2,val3],[this.ppp1.substring(0,this.ppp1.length-2)+(this.macron?"ūr":'ur')+participleEndings[this.number][this.gender],this.ppp1.substring(0,this.ppp1.length-2)]]
        this.stem=stems[this.tense][this.voice]
    }
    else{
        this.stem=val1;
    }
  }
  
  findConjugation(){
    if (this.infinative.charAt(this.infinative.length-3)=='ā'){
      this.indicLetter = "a";
      this.subjuncLetter = "e";
      this.conjugation = 1;
    }
    else if (this.infinative.charAt(this.infinative.length-3)=='ē'){
        this.indicLetter = "e";
        this.subjuncLetter = "ea";
        this.conjugation = 2;
      }
    else if (this.infinative.charAt(this.infinative.length-3)=='ī'){
        this.conjugation = 5;
        this.indicLetter = "i";
        this.subjuncLetter = "ia";
    }
    else if (this.pres1.charAt(this.pres1.length-2)=='i'){
      this.indicLetter = "ie";
      this.subjuncLetter = "a";
      this.conjugation = 4;
    }
    else{
      this.conjugation = 3;
      this.indicLetter = "ie";
      this.subjuncLetter = "a";
      }
    }
    formVerb() {
        this.findConjugation()
        this.findStem()
        this.findEndings()
        if (this.tense==0 && this.number==0 && this.person==0 && this.voice==0 && this.mood==0){
            return this.pres1
        }
        else{
return this.stem+this.ending;
        }
      }
}