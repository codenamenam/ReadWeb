import { Button, Center, Flex, Text, Title, Textarea } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Gowun_Batang, Noto_Sans_KR } from "next/font/google";

const gowun = Gowun_Batang({ subsets: ["latin"], weight: "400" });
const noto = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  // 전문테 지문 가져오기 - 하드코딩
  // const [readData, setReadData] = useState("");
  // const handleReadData = async () => {
  //   const result = await axios.get("../api/getReadData");
  //   if (result.status === 200) {
  //     setReadData(result.data.body);
  //   }
  // };

  // 동적 라우팅
  const router = useRouter();
  const [user_id, setUserId] = useState("");
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // handleReadData();

    const { user_id } = router.query;

    if (user_id && typeof user_id == "string") {
      setUserId(user_id);
      //handleSummaryData(user_id);
    }
  }, [router.isReady]);

  // 텍스트 입력
  const [inputValue, setInputValue] = useState("");
  const [inputValueLength, setInputValueLength] = useState(0);

  // 요약 제출 확인 - 작업중
  /**
   * 사용자가 요약을 제출했다면 1주일 뒤에 다시 사용할 수 있음.
   * 애러코드: 400
   * message: already exists
   * description: Try again next Monday
   */
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [summaryData, setSummaryData] = useState("");
  const [userName, setUserName] = useState("");

  // const handleSummaryData = async (user_id: string | string[]) => {
  //   const result = await axios.get("../api/getSummaryData/" + user_id);
  //   if (result.status === 200 && result.data.body != null) {
  //     setIsSubmitted(true);
  //     setSummaryData(result.data.body[0]["summary"]);
  //     setUserName(result.data.body[0]["user_name"]);
  //   }
  // };

  // 요약 제출 기능
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const submit = async () => {
    if (isSubmitted) {
      alert("이미 요약이 제출되었습니다. 조금만 기다려주세요.");
    } else if (!sessionStorage.getItem("inputData")) {
      alert("요약 내용을 입력해주세요.");
    } else {
      setIsSubmitted(true);

      const allData = {
        summary: sessionStorage.getItem("inputData"),
        bot_user_key: user_id,
      };

      setButtonDisabled(true);

      if (inputValueLength > 200) {
        alert("요약이 너무 길어요! 200자 이내로 요약을 해주세요.");
        setIsSubmitted(false);
        setButtonDisabled(false);
        return;
      }
      const result = await axios.post("../api/postSubmitData", allData);
      try {
        if (result.status === 200) {
          if (result.data == 200) {
            alert("요약이 제출되었습니다. 잠시 뒤 결과를 알려드릴께요!");
            setInputValue("");
            sessionStorage.setItem("inputData", "");
            setInputValueLength(0);
          } else if (result.data == 400) {
            alert("이미 참여하셨습니다! 다음주 월요일에 또 참여해주세요!");
          } else if (result.data == 401) {
            alert("당신은 누구..?");
          } else {
            setButtonDisabled(true);
            alert("오류가 발생하였습니다.");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Center>
        <Flex
          direction={"column"}
          align={"center"}
          style={{ width: "340px", marginTop: "20px" }}
          className={noto.className}
        >
          <Text
            style={{
              color: "grey",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            2023학년도
          </Text>

          <Text
            style={{
              marginBottom: "20px",
              fontSize: "25px",
              fontWeight: "700",
            }}
          >
            전국 문해력 테스트 국어영역
          </Text>

          <div
            className={gowun.className}
            style={{
              backgroundColor: " rgba(255, 255, 255, 1)",
              padding: "10px",
              marginBottom: isSubmitted ? "50px" : "130px",
              borderRadius: "7px",
            }}
          >
            <Text style={{ fontSize: "15.5px" }}>
              영화는 역사와 어떻게 관계를 맺고 있을까? 역사에 대한 영화적 독해와
              영화에 대한 역사적 독해는 영화와 역사의 관계에 대한 두 축을
              이룬다. 역사에 대한 영화적 독해는 영화라는 매체로 역사를 해석하고
              평가하는 작업과 연관된다. 영화인은 자기 나름의 시선을 서사와 표현
              기법으로 녹여내어 역사를 비평할 수 있다. 역사를 소재로 한 역사
              영화는 역사적 고증에 충실한 개연적 역사 서술 방식을 취할 수 있다.
              혹은 역사적 사실을 자원으로 삼되 상상력에 의존하여 가공의 인물과
              사건을 덧대는 상상적 역사 서술 방식을 취할 수도 있다. 그러나 비단
              역사 영화만이 역사를 재현하는 것은 아니다. 모든 영화는
              명시적이거나 우회적인 방법으로 역사를 증언한다. 영화에 대한 역사적
              독해는 영화에 담겨 있는 역사적 흔적과 맥락을 검토하는 것과
              연관된다. 역사가는 영화 속에 나타난 풍속, 생활상 등을 통해 역사의
              외연을 확장할 수 있다. 나아가 제작 당시 대중이 공유하던 욕망,
              강박, 믿음, 좌절 등의 집단적 무의식과 더불어 이상, 지배적
              이데올로기 같은 미처 파악하지 못했던 가려진 역사를 끌어내기도
              한다.
            </Text>
          </div>
        </Flex>

        <Flex
          direction={"column"}
          style={{
            position: "fixed",
            backgroundColor: "white",
            bottom: "0px",
            width: "100%",
            boxShadow: "0px 0px 0px 0px rgba(37, 38, 46, 0.15)",
            zIndex: 1000,
            borderRadius: "0px 0px 0 0",
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Flex direction={"column"} style={{ margin: "10px 20px 10px 20px" }}>
            <Flex direction="row" style={{ justifyContent: "space-between" }}>
              <Flex direction="column" style={{ width: "83%" }}>
                <Textarea
                  placeholder={"글을 읽고 200자 이내로 요약해주세요. "}
                  variant="unstyled"
                  autosize
                  minRows={2}
                  maxRows={4}
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.currentTarget.value);
                    setInputValueLength(event.currentTarget.value.length);
                    sessionStorage.setItem(
                      "inputData",
                      event.currentTarget.value
                    );
                  }}
                />
              </Flex>

              <Flex
                direction={"column"}
                style={{ width: "14%", marginTop: "6px" }}
                align={"center"}
              >
                <Button
                  style={{
                    width: "100%",
                    height: "30px",
                    padding: "0",
                    margin: "0 0 3px 0",
                  }}
                  color="ddColorMain"
                  variant="filled"
                  radius={5}
                  onClick={submit}
                  disabled={isButtonDisabled}
                >
                  <Text style={{ fontSize: "15px", fontWeight: 700 }}>
                    제출
                  </Text>
                </Button>
                <Flex style={{ marginBottom: "15px" }}>
                  <Text style={{ color: "grey", fontSize: "12px" }}>
                    {inputValueLength}
                  </Text>
                  <Text style={{ color: "grey", fontSize: "12px" }}>/200</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
