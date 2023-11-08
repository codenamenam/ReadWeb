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
      const result = await axios.post("../api/postSubmitData", allData);
      try {
        if (result.status === 200) {
          if (result.data == 200) {
            alert("요약이 제출되었습니다. 잠시 후 채점 결과를 알려드릴께요!");
            setInputValue("");
            sessionStorage.setItem("inputData", "");
            setInputValueLength(0);
          } else if (result.data == 400) {
            alert("이미 참여하셨습니다! 다음주 월요일에 또 참여해주세요!");
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
              사람들은 사막보다 푸른 초원을 더 아름답다고 생각한다. 이처럼
              인간이 왜 특정한 환경이나 공간적 배치를 더 아름답다고 생각하는지
              일반적인 설명이 필요하다. 조경 연구자 제이 애플턴의 ‘조망과 피신’
              이론에 따르면 인간은 남들에게 들키지 않고 바깥을 내다볼 수 있는
              곳을 선호 하게끔 진화했다. 장애물에 가리지 않는 열린 시야는 물이나
              음식물 같은 자원을 찾거나 포식자나 악당이 다가오는 것을 재빨리
              알아차리는 데 유리하다. 눈이 달려 있지 않은 머리 위나 등 뒤를 가려
              주는 피난처는 나를 포식자나 악당으로부터 보호해 준다. 산등성이에
              난 동굴 저 푸른 초원 위의 그림 같은 집, 동화 속 공주가 사는 성채,
              한쪽 벽면이 통유리로 된 층 카페 등은 모두 조망과 피신을 동시에
              제공하기 때문에 우리의 마음을 사로잡는다. 풍수지리설에서
              배산임수(背山臨水), 즉 뒤로 산이나 언덕을 등지고 앞에 강이나
              개울을 바라보는 집을 높게 쳐주는 것에도 심오한 진화적 근거가 깔려
              있는 셈이다.
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
                  placeholder={"글을 읽고 200자 이내로 요약해주세요."}
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
