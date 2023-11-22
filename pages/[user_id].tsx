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
              로렌츠의 관찰에 따르면 치명적인 발톱이나 이빨을 가진 동물들이 같은
              종의 구성원을 죽이는 경우는 드물다. 이는 중무장한 동물의 경우
              그들의 자체 생존을 위해서는 자기 종에 대한 공격을 제어할 억제
              메커니즘이 필요했었고, 그것이 진화의 과정에 반영되었기 때문이라고
              로렌츠는 설명한다. 그에 비해서 인간을 비롯한 신체적으로 미약한
              힘을 지닌 동물들은, 자신의 힘만으로 자기 종을 죽인다는 것이 매우
              어려운 일이었기 때문에, 이들의 경우 억제 메커니즘에 대한
              진화론적인 요구가 없었다는 것이다. 그런데 기술이 발달함에 따라
              인간은 살상 능력을 지니게 되었고, 억제 메커니즘을 지니지 못한
              인간에게 내재된 공격성은 자기 종을 살육할 수 있는 상황에 이르게 된
              것이다. 그렇다면 인간에 내재된 공격성을 제거하면 되지 않을까? 이
              점에 대해서 로렌츠는 회의적이다. 우선 인간의 공격적인 본능은
              긍정적인 측면과 부정적인 측면을 모두 포함해서 오늘날 인류를 있게
              한 중요한 요소 중의 하나이기에 이를 제거한다는 것이 인류에게 어떤
              영향을 끼칠지 알 수 없으며, 또 공격성을 최대한 억제시킨다고 해도
              공격성의 본능은 여전히 배출구를 찾으려고 하기 때문이다.
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
