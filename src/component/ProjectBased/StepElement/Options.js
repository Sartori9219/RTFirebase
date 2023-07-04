import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  Dimensions
} from "react-native";
import { Form } from 'react-bootstrap';
import VideoInput from './VideoInput'
import { formatBreakLine } from "../../utils";

import Footer from "../Footer";
const checkMarkImage = "assets/checkmark.svg";
const crossMarkImage = "assets/crossmark.svg";

const ws = Dimensions.get("window").width;

function Options({
  item,
  user,
  questions,
  currentGrade,
  currentQuestion,
  currentStep,
  selectedStepOption,
  setSelectedStepOption,
  currentSelect,
  setCurrentSelect,
  imageSrc,
  setImageSrc,
  queList,
  setQueList
}) {
  const [ansText, setAnsText] = useState([]);
  const [render, setRender] = useState(false);
  const [textQueData, setTextQueData] = useState();
  const [textHeight, setTextHeight] = useState([]);
  const [extAllow, setExtAllow] = useState(true);
  const [doc, setDoc] = useState([]);
  const [videoSrc, setVideoSrc] = useState([]);

  const onPress = (data) => {
    setSelectedStepOption(data);
    setCurrentSelect(data);
  }
  const handleFileChange = (event, currentStep, data) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      const fileName = event.target.files[0].name;
      const ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
      if (ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'gif' || ext === 'bmp' || ext === 'tiff' || ext === 'tif' || ext === 'raw') {
        onPress(data);
        const imageData = imageSrc;
        const videoData = videoSrc;
        const docData = doc;
        imageData[`${currentQuestion}-${currentStep}`] = url;
        videoData[`${currentQuestion}-${currentStep}`] = '';
        docData[`${currentQuestion}-${currentStep}`] = '';
        setVideoSrc(videoData);
        setImageSrc(imageData);
        setDoc(docData);
        setExtAllow(true);
      }
      else if (ext === 'mp4' || ext === 'avi' || ext === 'mov' || ext === 'wmv' || ext === 'flv' || ext === 'mkv') {
        onPress(data);
        const imageData = imageSrc;
        const videoData = videoSrc;
        const docData = doc;
        imageData[`${currentQuestion}-${currentStep}`] = '';
        videoData[`${currentQuestion}-${currentStep}`] = url;
        docData[`${currentQuestion}-${currentStep}`] = '';
        setImageSrc(imageData);
        setVideoSrc(videoData);
        setDoc(docData);
        setExtAllow(true);
      }
      else if (ext === 'docx' || ext === 'doc' || ext === 'xls' || ext === 'xlsx' || ext === 'pdf') {
        onPress(data);
        const imageData = imageSrc;
        const videoData = videoSrc;
        const docData = doc;
        imageData[`${currentQuestion}-${currentStep}`] = '';
        videoData[`${currentQuestion}-${currentStep}`] = '';
        docData[`${currentQuestion}-${currentStep}`] = 'doc';
        setImageSrc(imageData);
        setVideoSrc(videoData);
        setDoc(docData);
        setExtAllow(true);
      }

      else {
        onPress();
        const imageData = imageSrc;
        const videoData = videoSrc;
        const docData = doc;
        imageData[`${currentQuestion}-${currentStep}`] = '';
        videoData[`${currentQuestion}-${currentStep}`] = '';
        docData[`${currentQuestion}-${currentStep}`] = '';
        setImageSrc(imageData);
        setVideoSrc(videoData);
        setDoc(docData);
        setExtAllow(false);
      }
      setRender(!render);
    }
  };
  const scrShotQue = [
    "Add a selfie (image or video) of your team working on this. Be sure to show your solution in the context of the tool(s) you used to produce it.",
    "Share a screenshot or video that demonstrates the final iteration of your demo. Be sure to show your solution in the context of the tool(s) you used to produce it.",
    "Share a screenshot or video that shows the hardest part of what you did.   Be sure to show your solution in the context of the tool(s) you used to produce it."
  ];
  const textQue = (data) => {
    const question = [];
    if (data.includes('?')) {
      const queMark = data.split('?');
      queMark.forEach((que, index) => {
        if (index <= queMark.length - 2) {
          question.push(`${que.split('.')[que.split('.').length - 1]}?`.trim());
        }
      });
      return question;
    }
    else if (
      data.includes('research') ||
      data.includes('learn about') ||
      data.includes('Research') ||
      data.includes('Learn about')) {
      return "What were three valuable findings as a result of your research?";
    }
    else if (
      data.includes('make') ||
      data.includes('build') ||
      data.includes('create') ||
      data.includes('Make') ||
      data.includes('Build') ||
      data.includes('Create')
    ) {
      return "If you were to demonstrate this to someone to whom you are attracted, what 3 improvements would make?";
    }
    else {
      const queList = [
        "Describe what was the hardest part about this step?",
        "If you are to prepare this for a real world employer, what are 3 improvements you would make?",
        "What tools did you use to accomplish this?  What was the most challenging part?"
      ];
      return queList[parseInt(Math.random() * 2)];

    }
  }
  const changeTextSize = (e) => {
    const heightData = textHeight;
    heightData[`${currentQuestion}-${currentStep}`] = e.nativeEvent.contentSize.height;
    setTextHeight(heightData);
    setRender(!render);
  }
  const textChange = (txt) => {
    const textData = ansText;
    textData[`${currentQuestion}-${currentStep}`] = txt;
    setAnsText(textData);
    setRender(!render);
  }
  const formId = 'formFile';
  useEffect(() => {
    if (item.options) {
      let queData = [];
      let textQueData = [];
      for (let i = 0; i < item.options.length; i++) {
        queData.push(scrShotQue[parseInt(Math.random() * 2)]);
        textQueData.push(textQue(item.options[i]));
        setQueList(queData);
        setTextQueData(textQueData);
      }
    }
  }, [item.options]);

  return (
    <>
      {item.options &&
        item.options.map((data, index) => {
          let current = null;
          if (index <= currentStep)
            return (
              <Pressable
                key={`step${data}`}
              >
                <View style={[
                  styles.item,
                  {
                    borderColor: data === currentSelect ? "#A25ADC" : "#D3D3D3",
                    borderWidth: data === currentSelect ? "1px" : "1px",
                  },
                ]}>
                  <View style={[styles.rowItem, { marginTop: 13 }]}>
                    <View style={{ marginTop: 7, marginRight: -16, }}>
                      {data === currentSelect || index < currentStep ? (
                        <Image source={checkMarkImage} style={styles.checkMark} />
                      ) : (
                        <View style={styles.dot} />
                      )}
                    </View>
                    <View style={styles.step}>
                      <Text style={styles.stepText}>
                        Step {index + 1}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.rowItem, { minHeight: 50, marginBottom: 10 }]}>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.description}>
                        {formatBreakLine(data)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.rowItem, { marginTop: 23 }]}>
                    <Text style={styles.question}>
                      {textQueData && textQueData[index]}
                    </Text>
                  </View>
                  <View style={[styles.rowItem]}>
                    <View style={styles.voice}>
                      <TextInput
                        style={[styles.textInput, { height: textHeight[`${currentQuestion}-${index}`], maxHeight: 100 }]}
                        placeholder="Your answer"
                        editable={index === currentStep ? true : false}
                        multiline={true}
                        value={ansText[`${currentQuestion}-${index}`] || ''}
                        onContentSizeChange={changeTextSize}
                        onChange={(e) => textChange(e.target.value)}
                      />
                      {/* <View style={styles.voiceIcon}>
                        <Image
                          style={{ position: 'initial' }}
                          source={'assets/voiceIcon.PNG'}
                        />
                      </View> */}
                    </View>
                  </View>
                  <View style={[styles.rowItem, { marginTop: 25 }]}>
                    <Text style={styles.question}>
                      {queList && queList[index]}
                    </Text>
                  </View>
                  <View style={styles.rowItem}>
                    <Pressable style={(state) => [
                      styles.upload,
                      state.hovered ? styles.hoveredUploade : styles.unHovered,
                    ]}
                    >
                      <Form.Group style={{ width: '100%', height: '100%' }} controlId={index === currentStep ? formId : 'form'}>
                        <Form.Label className="cursorPointer">
                          {((extAllow && (index === currentStep)) || imageSrc[`${currentQuestion}-${index}`] || videoSrc[`${currentQuestion}-${index}`] || doc[`${currentQuestion}-${index}`]) ? (
                            <View style={styles.imageView}>
                              {
                                !imageSrc[`${currentQuestion}-${index}`] && !videoSrc[`${currentQuestion}-${index}`] && !doc[`${currentQuestion}-${index}`] ? (
                                  <View style={styles.plus}>
                                    <Image
                                      style={{ position: 'initial', }}
                                      source={'assets/plus.PNG'}
                                    />
                                  </View>
                                ) : (
                                  <View style={styles.backImage}>
                                    {imageSrc[`${currentQuestion}-${index}`] && <Image source={{ uri: imageSrc[`${currentQuestion}-${index}`] }}
                                      style={{ position: 'initial', }} />}
                                    {videoSrc[`${currentQuestion}-${index}`] && <VideoInput
                                      width={75}
                                      height={75}
                                      videoSrc={videoSrc[`${currentQuestion}-${index}`]}
                                    />
                                    }
                                    {doc[`${currentQuestion}-${index}`] && <Image
                                      style={{ position: 'initial', }}
                                      width={75}
                                      height={75}
                                      source={'assets/document.png'}
                                    />
                                    }

                                  </View>
                                )
                              }
                            </View>

                          ) : (
                            <View style={{ width: "100%", height: "100%" }}>
                              <Text style={{ width: "100%", height: "100%", marginTop: 18, left: '50%', color: 'red' }}>
                                {` Please upload a valid file.\n We support these file types: \n mp4, avi,docx, doc, xls,xlsx, pdf, png, jpeg, jpg, gif, bmp.`}
                              </Text>
                            </View>
                          )}
                        </Form.Label>
                        {
                          index === currentStep && <Form.Control type="file" name='image' style={{ display: 'none' }}
                            onChange={(event) => handleFileChange(event, currentStep, item.options[currentStep])} />
                        }


                      </Form.Group>

                    </Pressable>
                  </View>
                </View>
              </Pressable >
            )
        })}
    </>
  );
}

export default Options;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 12,
  },
  step: {
    width: "100%",
    paddingRight: 18,
    marginLeft: 30,
  },
  title: {
    fontWeight: "400",
    fontSize: "120%",
    color: "#A25ADC",
  },
  question: {
    fontWeight: "400",
    fontSize: "80%",
    color: "#1D232E",
  },
  description: {
    fontWeight: "300",
    fontSize: "100%",
    color: "#1D232E",
    paddingRight: 8,
    lineHeight: "100%",
    textAlign: "left"
  },
  stepText: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "100%",
    marginTop: 2
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: ws > 960 ? ws / 3 - 80 : ws > 600 ? ws / 2 - 80 : ws - 80,
    padding: 5,
    paddingHorizontal: 16,
  },
  voice: {
    backgroundColor: '#F9F2FF',
    width: '100%',
    minHeight: 35,
    borderRadius: 8,
    flexDirection: "row",
  },
  voiceIcon: {
    width: 18,
    backgroundColor: 'black',
    borderRadius: 8
  },
  textInput: {
    maxHeight: 200,
    height: 'auto',
    padding: 10,
    fontSize: '100%',
    width: ws > 960 ? ws / 3 - 150 : ws > 600 ? ws / 2 - 150 : ws - 150,
    borderWidth: 0,
    width: "100%"

  },
  upload: {
    width: '100%',
    minHeight: 100,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  hoveredUploade: {
    backgroundColor: '#A25ADC'
  },
  unHovered: {
    backgroundColor: '#F9F2FF',
    cursor: 'pointer'
  },
  backImage: {
    flex: 1,
    height: 80,
    width: 80,
    marginLeft: ws > 960 ? ws / 6 - 100 : ws > 600 ? ws / 4 - 100 : ws / 2 - 100,
  },
  plus: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginLeft: ws > 960 ? ws / 6 - 80 : ws > 600 ? ws / 4 - 80 : ws / 2 - 80,
  },
  imageView: {
    width: 200,
    minHeight: 100,
    padding: 10
  },
  item: {
    marginVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "#D3D3D3",
    backgroundColor: "#fff",
    shadowColor: "#AE66E4",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexGrow: 0,
    marginHorizontal: 16,
    boxSizing: "border-box"
  },
  image: {
    maxHeight: 180,
    minHeight: 60,
    width: 40,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  dot: {
    border: "1px solid #D3D3D3",
    height: 16,
    width: 16,
    borderRadius: 50,
  },
  checkMark: {
    height: 16,
    width: 16,
    resizeMode: "object-fit",
  },
});
