import {
  Button,
  Center,
  Flex,
  Text,
  Title,
  RingProgress,
  Textarea,
} from "@mantine/core";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  //지문 가져오기
  const [readData, setReadData] = useState("");

  const handleReadData = async () => {
    const result = await axios.get("../api/getReadData");
    if (result.status === 200) {
      setReadData(result.data.body);
    }
  };

  // 동적 라우팅
  const router = useRouter();
  const [user_id, setUserId] = useState("");
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    handleReadData();

    const { user_id } = router.query;

    if (user_id && typeof user_id == "string") {
      setUserId(user_id);
      handleSummaryData(user_id);
    }
  }, [router.isReady]);

  //날짜 가져오기
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  //타이머
  const [timeRemaining, setTimeRemaining] = useState(300);
  useEffect(() => {
    const timer = setInterval(() => {
      // 타이머 콜백 함수
      if (timeRemaining > 0) {
        // 시간이 남아있을 때
        setTimeRemaining(timeRemaining - 1); // 1초씩 감소
      } else {
        clearInterval(timer); // 시간이 다 되면 타이머 종료
      }
    }, 1000); // 1초마다 실행

    const storedInputData = sessionStorage.getItem("inputData");
    const inputValue: string | null =
      storedInputData !== null ? storedInputData : ""; // 또는 기본값을 다른 값으로 설정할 수 있습니다

    setInputValue(inputValue);
    setInputValueLength(inputValue.length);

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
      sessionStorage.setItem("timeRemaining", timeRemaining.toString());
    };
  }, [timeRemaining]);

  const progressRatio = (timeRemaining / 300) * 100;

  // 초를 분과 초로 변환
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // 시간을 00:00 형식으로 포맷
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  // 텍스트 입력
  const [inputValue, setInputValue] = useState("");
  const [inputValueLength, setInputValueLength] = useState(0);

  // 요약 다시보기
  /**
   * URL에 사용자 식별 id(10.9 DB기준: SummaryData 테이블의 user_id) 전달됨
   * 그 id를 가져와야 됨
   * 챗봇에서 쏴줄 때, user_id가 매일 암호화되어 전송되어야 함
   * -> 사용자가 즐겨찾기 해놓고 새로고침하면서 못쓰게 하려고..
   *
   *
   * 가져온 아이디에 기반하여 getSummaryData 요청을 보냄
   * 1. 사용자가 요약을 제출했다면: 하단에 요약 다시보기 컴포넌트가 보임
   * 2. 사용자가 요약을 제출하지 않았다면: 아무것도 안뜸
   */
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [summaryData, setSummaryData] = useState("");
  const [userName, setUserName] = useState("");

  const handleSummaryData = async (user_id: string | string[]) => {
    const result = await axios.get("../api/getSummaryData/" + user_id);
    if (result.status === 200 && result.data.body != null) {
      setIsSubmitted(true);
      setSummaryData(result.data.body[0]["summary"]);
      setUserName(result.data.body[0]["user_name"]);
    }
  };

  // 제출 기능
  const submit = async () => {
    console.log(sessionStorage.getItem("inputData"));
    if (sessionStorage.getItem("inputData")?.length == 0) {
      alert("요약 내용을 입력해주세요.");
    } else {
      const allData = {
        bot: {
          id: "64bb62cd84644d346efde407",
          name: "도파민 디펜스 봇",
        },
        intent: {
          id: "64c791901a44040a688c7491",
          name: "요약하기",
          extra: {
            reason: {
              code: 0,
              message: "OK",
            },
          },
        },
        action: {
          id: "64e439e08c33dd465729751d",
          name: "post-submit-summary",
          params: {
            summary: "",
          },
          detailParams: {
            summary: {
              groupName: "",
              origin: inputValue,
              value: "",
            },
          },
        },
        clientExtra: {},
        userRequest: {
          block: {
            id: "64c791901a44040a688c7491",
            name: "요약하기",
          },
          user: {
            id: "4025ce2f5726e5b4e585f3d172c1fe97156ba4ae381ab1b756583e9fbf8982a22f",
            type: "botUserKey",
            properties: {
              botUserKey:
                "4025ce2f5726e5b4e585f3d172c1fe97156ba4ae381ab1b756583e9fbf8982a22f",
              appUserStatus: "REGISTERED",
              isFriend: true,
              app_user_status: "REGISTERED",
              app_user_id: user_id,
              plusfriendUserKey: "ckUy2724egt1",
              appUserId: user_id,
              bot_user_key:
                "4025ce2f5726e5b4e585f3d172c1fe97156ba4ae381ab1b756583e9fbf8982a22f",
              plusfriend_user_key: "ckUy2724egt1",
            },
          },
          utterance: "요약하기",
          params: {
            surface: "Kakaotalk.plusfriend",
          },
          lang: "ko",
          timezone: "Asia/Seoul",
        },
        contexts: [],
      };

      const result = await axios.post("../api/postSubmitData", allData);
      alert("요약이 제출되었습니다. \n8시에 결과를 보내드릴께요!");
      setInputValue("");
      sessionStorage.setItem("inputData", "");
      setInputValueLength(0);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", overflowY: "auto" }}>
      <div
        style={{
          position: "absolute",
          left: "0",
          width: "1px",
          height: "calc(100% + 1px)",
        }}
      ></div>
      <div style={{ width: "100%", height: "auto" }}>
        <Center>
          <Flex
            direction={"column"}
            style={{ width: "340px", marginTop: "20px" }}
          >
            <Flex
              direction={"row"}
              align={"center"}
              justify={"space-between"}
              style={{ marginBottom: "20px" }}
            >
              <Flex direction={"column"}>
                <Text
                  style={{
                    color: "grey",
                    fontWeight: "500",
                    fontSize: "12px",
                    margin: "5px 0 5px 0",
                  }}
                >
                  {month}월 {day}일
                </Text>
                <Flex>
                  <Title size={20}>오늘의&nbsp;</Title>
                  <Title size={20} style={{ color: "#F21D76" }}>
                    디펜스
                  </Title>
                </Flex>
              </Flex>
              <RingProgress
                label={
                  <Center>
                    <Text
                      style={{
                        color: "grey",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      {formattedTime}
                    </Text>
                  </Center>
                }
                sections={[{ value: progressRatio, color: "#F21D76" }]}
                size={60}
                thickness={5}
                style={{ margin: 0, padding: 0 }}
              ></RingProgress>
            </Flex>
            <div
              style={{
                backgroundColor: " rgba(250, 251, 252, 1)",
                padding: "10px",
                marginBottom: isSubmitted ? "50px" : "130px",
              }}
            >
              <Text style={{ fontSize: "16px" }}>{readData}</Text>
            </div>
            {isSubmitted && (
              <>
                <Flex style={{ marginBottom: "20px" }}>
                  <Title size={20}>{userName}님의&nbsp;</Title>
                  <Title size={20}>요약&nbsp;</Title>
                  <Title size={20} style={{ color: "#F21D76" }}>
                    다시보기
                  </Title>
                </Flex>
                <div
                  style={{
                    backgroundColor: " rgba(250, 251, 252, 1)",
                    padding: "10px",
                    marginBottom: "130px",
                  }}
                >
                  <Text style={{ fontSize: "15px", color: "grey" }}>
                    {summaryData}
                  </Text>
                </div>
              </>
            )}
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
            <Flex
              direction={"column"}
              style={{ margin: "10px 20px 10px 20px" }}
            >
              <Flex direction="row" style={{ justifyContent: "space-between" }}>
                <Flex direction="column" style={{ width: "83%" }}>
                  <Textarea
                    placeholder={
                      "여기에 요약해주세요. \n8시에 AI 피드백이 제공됩니다!"
                    }
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
                  >
                    <Text style={{ fontSize: "15px", fontWeight: 700 }}>
                      제출
                    </Text>
                  </Button>
                  <Flex style={{ marginBottom: "15px" }}>
                    <Text style={{ color: "grey", fontSize: "12px" }}>
                      {inputValueLength}
                    </Text>
                    <Text style={{ color: "grey", fontSize: "12px" }}>
                      /200
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Center>
      </div>
    </div>
  );
}
