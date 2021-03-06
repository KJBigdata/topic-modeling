# TextCleaner
본 문서는 2020.10.12 기준으로 작성되었습니다.

## 데이터 클린징

Clean RSN News <br>
1) 정규표현식에 매칭되는 패턴 제거<br>
    - big_bracket
    - small_bracket
    - forbidden_char
    - email
    - reporter
    - url
    - image
    - datetime
2) Copyright 문구 제거(선택)<br>

```shell script
import cleaner_news
cleaner = RsnNewsCleaner()
text = "【테구시갈파=AP/뉴시스】 2020.06.22 12:37 LG전자 홈페이지(www.goyangwithus.co.kr), 6이닝 무피안타 무실점 호투 [서울=뉴시스] 박민석 기자 = 28일 오후 오후 서울 송파구 잠실야구장에서 열린 2020 신한은행 SOL KBO리그 SK 와이번스와 두산 베어스의 경기, 1회말 SK 선발 투수 이건욱이 역투하고 있다. 2020.05.28. mspark@newsis.com [인천=뉴시스] 김주희 기자 = SK 와이번스 이건욱(25)이 6이닝을 노히트 무실점으로 틀어막으며 제대로 눈도장을 찍었다.  이건욱은 26일 인천 SK 행복드림구장에서 열린 2020 신한은행 쏠 KBO리그 LG 트윈스와 경기에 선발 등판, 6이닝 동안 안타를 하나도 맞지 않는 위력투로 LG 타선을 잠재웠다. 볼넷 3개를 내줬지만, 삼진 3개를 솎아내면서 무실점 호투했다.  이건욱의 호투를 발판으로 SK는 LG를 7-0으로 대파하고 2연승을 달렸다.  그야말로 '인생투'였다.  2014년 프로 데뷔 후 개인 한 경기 최다 이닝을 소화한 이건욱은 첫 퀄리티 스타트(QS, 선발 6이닝 이상 3자책점 이하)도 달성했다.  이렇다 할 위기도 없었다. LG 타자들은 이건욱 앞에서 연신 힘없이 물러났다.  6회를 마친 뒤 투구 수가 90개에 달해 7회부터 마운드를 김정빈에게 넘기며 '노히트 노런'까진 이룰 수 없었지만, 존재감을 드러내기엔 충분한 투구였다.  경기 후 만난 이건욱은 '5회가 끝난 뒤 노히트 중인 걸 알았다. 하지만 사사구가 4개다. 차라리 안타가 4개고 볼넷이 0이었으면 좋겠단 생각을 했다'며 제구에 아쉬움을 드러냈다.  7회 교체에는 미련도 남기지 않았다.  이건욱은 '6회가 끝이라고 생각하고 던졌다'며 웃음 지었다.  6회초 2사 1루 김현수 타석에서 최상덕 SK 투수 코치는 마운드에 올라 이건욱을 다독이고 내려갔다. 이건욱은 지난 9일 LG전에서 김현수에게 홈런을 맞은 기억이 있다.  이건욱은 '코치님께서 '지금도 충분히 잘하고 있으니, 자신감을 가지고 던져라'고 하셨다. 마지막 타자라는 생각으로 힘껏 던지돼 밸런스를 유지하라고 말하시더라'고 설명했다.  코치의 당부대로 이건욱은 초구에 김현수를 우익수 뜬공으로 돌려세우고 6회를 마치며 임무를 완수했다.  사실 이건욱은 이날 컨디션이 그리 좋지 않았다.  이건욱은 '컨디션이 좋지 않아 직구가 많이 떴다. (포수) 이재원 형이 변화구로 카운트를 잡고, 리드를 잘 해줘서 좋은 결과가 나왔다'고 고마워했다.  이건욱은 올 시즌 닉 킹엄이 팔꿈치 통증으로 전열에서 이탈하면서 대체 선발로 나서기 시작했다. '우연히' 찾아온 기회를 실력으로 잡아내는 중이다.  그러나 절박함은 변함이 없다.  이건욱은 '경기에 나설 때마다 이번에 못 던지면 2군으로 내려갈 수 있다는 생각을 한다. 올해 끝까지 가봐야 1군 투수라고 생각할 수 있다'며 긴장을 놓지 않았다.  선발 기회를 준 수장에도 고마움을 전했다. 염경엽 SK 감독은 전날(25일) 두산 베어스와 더블헤더 1차전 중 쓰러져 병원에 입원해 있다.  이건욱은 '감독님께서 선발 기회를 주셔서 지금 이 자리에 있을 수 있다'며 '감독님께 잘 던지는 모습을 보여주면 좋았을 것 같다. 빨리 완쾌하셔서 함께 했으면 좋겠다'고 바랐다.  ◎공감언론 뉴시스 juhee@newsis.com<저작권자ⓒ 공감언론 뉴시스통신사. 무단전재-재배포 금지.>      0좋아요 	  저작권자 ⓒ 뉴시스 기사제공. 무단전재-재배포 금지"
cleaner.clean(text, option_kss=False) #Default
cleaner.clean(text, option_kss=True)
```

Example
- Input(Raw News txt):
```
【테구시갈파=AP/뉴시스】 2020.06.22 12:37 LG전자 홈페이지(www.goyangwithus.co.kr), 
6이닝 무피안타 무실점 호투 [서울=뉴시스] 박민석 기자 = 28일 오후 오후 서울 송파구 잠실야구장에서 열린 2020 신한은행 SOL KBO리그 
SK 와이번스와 두산 베어스의 경기, 1회말 SK 선발 투수 이건욱이 역투하고 있다. 2020.05.28. mspark@newsis.com 
[인천=뉴시스] 김주희 기자 = SK 와이번스 이건욱(25)이 6이닝을 노히트 무실점으로 틀어막으며 제대로 눈도장을 찍었다.  이건욱은 26일 인천 
SK 행복드림구장에서 열린 2020 신한은행 쏠 KBO리그 LG 트윈스와 경기에 선발 등판, 6이닝 동안 안타를 하나도 맞지 않는 위력투로 
LG 타선을 잠재웠다. 볼넷 3개를 내줬지만, 삼진 3개를 솎아내면서 무실점 호투했다.  이건욱의 호투를 발판으로 SK는 LG를 7-0으로 
대파하고 2연승을 달렸다.  그야말로 '인생투'였다.  2014년 프로 데뷔 후 개인 한 경기 최다 이닝을 소화한 
이건욱은 첫 퀄리티 스타트(QS, 선발 6이닝 이상 3자책점 이하)도 달성했다.  이렇다 할 위기도 없었다. LG 타자들은 이건욱 앞에서 
연신 힘없이 물러났다.  6회를 마친 뒤 투구 수가 90개에 달해 7회부터 마운드를 김정빈에게 넘기며 '노히트 노런'까진 이룰 수 없었지만, 존재감을 
드러내기엔 충분한 투구였다.  경기 후 만난 이건욱은 '5회가 끝난 뒤 노히트 중인 걸 알았다. 하지만 사사구가 4개다. 차라리 안타가 
4개고 볼넷이 0이었으면 좋겠단 생각을 했다'며 제구에 아쉬움을 드러냈다.  7회 교체에는 미련도 남기지 않았다.  이건욱은 '6회가 끝이라고 
생각하고 던졌다'며 웃음 지었다.  6회초 2사 1루 김현수 타석에서 최상덕 SK 투수 코치는 마운드에 올라 이건욱을 다독이고 내려갔다. 이건욱은 
지난 9일 LG전에서 김현수에게 홈런을 맞은 기억이 있다.  이건욱은 '코치님께서 '지금도 충분히 잘하고 있으니, 자신감을 가지고 던져라'고 하셨다. 마지막 
타자라는 생각으로 힘껏 던지돼 밸런스를 유지하라고 말하시더라'고 설명했다.  코치의 당부대로 이건욱은 초구에 김현수를 우익수 뜬공으로 돌려세우고 
6회를 마치며 임무를 완수했다.  사실 이건욱은 이날 컨디션이 그리 좋지 않았다.  이건욱은 '컨디션이 좋지 않아 직구가 많이 떴다. (포수) 
이재원 형이 변화구로 카운트를 잡고, 리드를 잘 해줘서 좋은 결과가 나왔다'고 고마워했다.  이건욱은 올 시즌 닉 킹엄이 팔꿈치 통증으로 
전열에서 이탈하면서 대체 선발로 나서기 시작했다. '우연히' 찾아온 기회를 실력으로 잡아내는 중이다.  그러나 절박함은 변함이 없다.  이건욱은 '경기에 
나설 때마다 이번에 못 던지면 2군으로 내려갈 수 있다는 생각을 한다. 올해 끝까지 가봐야 1군 투수라고 생각할 수 있다'며 긴장을 놓지 않았다.  선발 기회를 
준 수장에도 고마움을 전했다. 염경엽 SK 감독은 전날(25일) 두산 베어스와 더블헤더 1차전 중 쓰러져 병원에 입원해 있다.  이건욱은 '감독님께서 선발 
기회를 주셔서 지금 이 자리에 있을 수 있다'며 '감독님께 잘 던지는 모습을 보여주면 좋았을 것 같다. 빨리 완쾌하셔서 함께 했으면 좋겠다'고 
바랐다.  ◎공감언론 뉴시스 juhee@newsis.com<저작권자ⓒ 공감언론 뉴시스통신사. 무단전재-재배포 금지.>      0좋아요 	  저작권자 ⓒ 뉴시스 
기사제공. 무단전재-재배포 금지
```
- Output(False case of Copyright kss option False):
```
"LG전자 홈페이지, 
6이닝 무피안타 무실점 호투 = 28일 오후 오후 서울 송파구 잠실야구장에서 열린 2020 신한은행 SOL KBO리그 
SK 와이번스와 두산 베어스의 경기, 1회말 SK 선발 투수 이건욱이 역투하고 있다. 
= SK 와이번스 이건욱(25)이 6이닝을 노히트 무실점으로 틀어막으며 제대로 눈도장을 찍었다. 이건욱은 26일 인천 
SK 행복드림구장에서 열린 2020 신한은행 쏠 KBO리그 LG 트윈스와 경기에 선발 등판, 6이닝 동안 안타를 하나도 맞지 않는 위력투로 
LG 타선을 잠재웠다. 볼넷 3개를 내줬지만, 삼진 3개를 솎아내면서 무실점 호투했다. 이건욱의 호투를 발판으로 SK는 LG를 7-0으로 
대파하고 2연승을 달렸다. 그야말로 '인생투'였다. 2014년 프로 데뷔 후 개인 한 경기 최다 이닝을 소화한 
이건욱은 첫 퀄리티 스타트(QS, 선발 6이닝 이상 3자책점 이하)도 달성했다. 이렇다 할 위기도 없었다. LG 타자들은 이건욱 앞에서 
연신 힘없이 물러났다. 6회를 마친 뒤 투구 수가 90개에 달해 7회부터 마운드를 김정빈에게 넘기며 '노히트 노런'까진 이룰 수 없었지만, 존재감을 
드러내기엔 충분한 투구였다. 경기 후 만난 이건욱은 '5회가 끝난 뒤 노히트 중인 걸 알았다. 하지만 사사구가 4개다. 차라리 안타가 
4개고 볼넷이 0이었으면 좋겠단 생각을 했다'며 제구에 아쉬움을 드러냈다. 7회 교체에는 미련도 남기지 않았다. 이건욱은 '6회가 끝이라고 
생각하고 던졌다'며 웃음 지었다. 6회초 2사 1루 김현수 타석에서 최상덕 SK 투수 코치는 마운드에 올라 이건욱을 다독이고 내려갔다. 이건욱은 
지난 9일 LG전에서 김현수에게 홈런을 맞은 기억이 있다. 이건욱은 '코치님께서 '지금도 충분히 잘하고 있으니, 자신감을 가지고 던져라'고 하셨다. 마지막 
타자라는 생각으로 힘껏 던지돼 밸런스를 유지하라고 말하시더라'고 설명했다. 코치의 당부대로 이건욱은 초구에 김현수를 우익수 뜬공으로 돌려세우고 
6회를 마치며 임무를 완수했다. 사실 이건욱은 이날 컨디션이 그리 좋지 않았다. 이건욱은 '컨디션이 좋지 않아 직구가 많이 떴다. (포수) 
이재원 형이 변화구로 카운트를 잡고, 리드를 잘 해줘서 좋은 결과가 나왔다'고 고마워했다. 이건욱은 올 시즌 닉 킹엄이 팔꿈치 통증으로 
전열에서 이탈하면서 대체 선발로 나서기 시작했다. '우연히' 찾아온 기회를 실력으로 잡아내는 중이다. 그러나 절박함은 변함이 없다. 이건욱은 '경기에 
나설 때마다 이번에 못 던지면 2군으로 내려갈 수 있다는 생각을 한다. 올해 끝까지 가봐야 1군 투수라고 생각할 수 있다'며 긴장을 놓지 않았다. 선발 기회를 
준 수장에도 고마움을 전했다. 염경엽 SK 감독은 전날(25일) 두산 베어스와 더블헤더 1차전 중 쓰러져 병원에 입원해 있다. 이건욱은 '감독님께서 선발 
기회를 주셔서 지금 이 자리에 있을 수 있다'며 '감독님께 잘 던지는 모습을 보여주면 좋았을 것 같다. 빨리 완쾌하셔서 함께 했으면 좋겠다'고 
바랐다. 공감언론 뉴시스 0좋아요 저작권자 뉴시스 기사제공. 무단전재-재배포 금지"
```
- Extracted regex pattern phrase
```
[【테구시갈파=AP/뉴시스】, 2020.06.22 12:37, (www.goyangwithus.co.kr), 2020.05.28., 
mspark@newsis.com, [인천=뉴시스], 김주희 기자, ◎, juhee@newsis.com,
<저작권자ⓒ 공감언론 뉴시스통신사. 무단전재-재배포 금지.>, ⓒ]
```
- Output(True case of Copyright kss option):
```
"LG전자 홈페이지, 
6이닝 무피안타 무실점 호투 = 28일 오후 오후 서울 송파구 잠실야구장에서 열린 2020 신한은행 SOL KBO리그 
SK 와이번스와 두산 베어스의 경기, 1회말 SK 선발 투수 이건욱이 역투하고 있다. 
= SK 와이번스 이건욱(25)이 6이닝을 노히트 무실점으로 틀어막으며 제대로 눈도장을 찍었다. 이건욱은 26일 인천 
SK 행복드림구장에서 열린 2020 신한은행 쏠 KBO리그 LG 트윈스와 경기에 선발 등판, 6이닝 동안 안타를 하나도 맞지 않는 위력투로 
LG 타선을 잠재웠다. 볼넷 3개를 내줬지만, 삼진 3개를 솎아내면서 무실점 호투했다. 이건욱의 호투를 발판으로 SK는 LG를 7-0으로 
대파하고 2연승을 달렸다. 그야말로 '인생투'였다. 2014년 프로 데뷔 후 개인 한 경기 최다 이닝을 소화한 
이건욱은 첫 퀄리티 스타트(QS, 선발 6이닝 이상 3자책점 이하)도 달성했다. 이렇다 할 위기도 없었다. LG 타자들은 이건욱 앞에서 
연신 힘없이 물러났다. 6회를 마친 뒤 투구 수가 90개에 달해 7회부터 마운드를 김정빈에게 넘기며 '노히트 노런'까진 이룰 수 없었지만, 존재감을 
드러내기엔 충분한 투구였다. 경기 후 만난 이건욱은 '5회가 끝난 뒤 노히트 중인 걸 알았다. 하지만 사사구가 4개다. 차라리 안타가 
4개고 볼넷이 0이었으면 좋겠단 생각을 했다'며 제구에 아쉬움을 드러냈다. 7회 교체에는 미련도 남기지 않았다. 이건욱은 '6회가 끝이라고 
생각하고 던졌다'며 웃음 지었다. 6회초 2사 1루 김현수 타석에서 최상덕 SK 투수 코치는 마운드에 올라 이건욱을 다독이고 내려갔다. 이건욱은 
지난 9일 LG전에서 김현수에게 홈런을 맞은 기억이 있다. 이건욱은 '코치님께서 '지금도 충분히 잘하고 있으니, 자신감을 가지고 던져라'고 하셨다. 마지막 
타자라는 생각으로 힘껏 던지돼 밸런스를 유지하라고 말하시더라'고 설명했다. 코치의 당부대로 이건욱은 초구에 김현수를 우익수 뜬공으로 돌려세우고 
6회를 마치며 임무를 완수했다. 사실 이건욱은 이날 컨디션이 그리 좋지 않았다. 이건욱은 '컨디션이 좋지 않아 직구가 많이 떴다. (포수) 
이재원 형이 변화구로 카운트를 잡고, 리드를 잘 해줘서 좋은 결과가 나왔다'고 고마워했다. 이건욱은 올 시즌 닉 킹엄이 팔꿈치 통증으로 
전열에서 이탈하면서 대체 선발로 나서기 시작했다. '우연히' 찾아온 기회를 실력으로 잡아내는 중이다. 그러나 절박함은 변함이 없다. 이건욱은 '경기에 
나설 때마다 이번에 못 던지면 2군으로 내려갈 수 있다는 생각을 한다. 올해 끝까지 가봐야 1군 투수라고 생각할 수 있다'며 긴장을 놓지 않았다. 선발 기회를 
준 수장에도 고마움을 전했다. 염경엽 SK 감독은 전날(25일) 두산 베어스와 더블헤더 1차전 중 쓰러져 병원에 입원해 있다. 이건욱은 '감독님께서 선발 
기회를 주셔서 지금 이 자리에 있을 수 있다'며 '감독님께 잘 던지는 모습을 보여주면 좋았을 것 같다. 빨리 완쾌하셔서 함께 했으면 좋겠다'고 
바랐다."
```
- Extracted regex pattern phrase and copyright pattern
```
[【테구시갈파=AP/뉴시스】, 2020.06.22 12:37, (www.goyangwithus.co.kr), 2020.05.28., 
mspark@newsis.com, [인천=뉴시스], 김주희 기자, ◎, juhee@newsis.com,
<저작권자ⓒ 공감언론 뉴시스통신사. 무단전재-재배포 금지.>, ⓒ, 공감언론 뉴시스 0좋아요 저작권자 뉴시스 기사제공. 무단전재-재배포 금지]
```