"use client"

import { Card, Tabs, Progress, Button, Typography, Space } from "antd"
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons"
import styled from "styled-components"

// Add these imports at the top
import { motion } from "framer-motion"
import { useState } from "react"

const { Title, Text } = Typography
const { TabPane } = Tabs

// Custom theme colors
const primaryColor = "#469B74" // Green
const secondaryColor = "#FCB80B" // Yellow/Gold
const whiteColor = "#FFFFFF" // White

// Styled component for custom tab styling
// Replace the StyledTabs styled component with this enhanced version
const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    border-radius: 6px 6px 0 0 !important;
    margin: 0 4px 0 0 !important;
    padding: 8px 16px !important;
    transition: all 0.3s ease;
    font-family:"font-shopee";

    &:hover {
      color: ${primaryColor} !important;
      transform: translateY(-3px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .ant-tabs-tab-active {
    background-color: ${primaryColor} !important;
    border-color: ${primaryColor} !important;

    .ant-tabs-tab-btn {
      color: ${whiteColor} !important;
    }
  }

  .ant-tabs-nav {
    margin-bottom: 16px;
  }

  .ant-tabs-nav-list {
    border-bottom: 2px solid ${primaryColor};
    font-family: "font-shopee";
  }
`

// Modify the MyLearning component to include the useState hook
const MyLearning = () => {
  // Add this state for tab change animation
  const [ setActiveKey] = useState("in-progress")

  return (
    <div className="font-shopee">
       <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ maxWidth: 1200, margin: "20px auto", padding: "0 16px" }}
    >
      <motion.div initial={{ x: -20 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
        <Title className=" font-shopee" level={3} style={{ color: primaryColor, marginBottom: 16 }}>
          My Learning
        </Title>
      </motion.div>

      <StyledTabs  defaultActiveKey="library" type="card" onChange={(key) => setActiveKey(key)}>
        <TabPane className="font-shopee" tab="Library" key="library">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card
              title="My Public Flashcards"
              headStyle={{ backgroundColor: primaryColor, color: whiteColor }}
              className="font-shopee hover:shadow-lg transition-shadow duration-300"
            >
              <Card
                bodyStyle={{ padding: 16 }}
                className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: `${primaryColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                    className="transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  >
                    <CalendarOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                      Digital Marketing Mid-Terms
                    </Title>
                    <Text className="font-shopee" type="secondary">50 cards</Text>

                   
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className="font-shopee hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </Card>
              <Card
                bodyStyle={{ padding: 16 }}
                className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: `${primaryColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                    className="transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  >
                    <CalendarOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                      Digital Marketing Terms
                    </Title>
                    <Text className="font-shopee" type="secondary">50 cards</Text>

  
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className="font-shopee hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </Card>
            </Card>
       
              
          </motion.div>
        </TabPane>

        <TabPane tab="Private" key="private">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card
            
              title="My Flashcards"
              headStyle={{ backgroundColor: primaryColor, color: whiteColor }}
              className="font-shopee hover:shadow-lg transition-shadow duration-300"
            >
              <Card
                bodyStyle={{ padding: 16 }}
                className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: `${primaryColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                    className="transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  >
                    <CalendarOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                      Digital Marketing Mid-Terms
                    </Title>
                    <Text className="font-shopee" type="secondary">50 cards</Text>

                   
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className="font-shopee hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </Card>
              <Card
                bodyStyle={{ padding: 16 }}
                className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: `${primaryColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                    className="transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  >
                    <CalendarOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                      Digital Marketing Terms
                    </Title>
                    <Text className="font-shopee" type="secondary">50 cards</Text>

  
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className="font-shopee hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </Card>
              <Card
                bodyStyle={{ padding: 16 }}
                className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: `${primaryColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                    className="transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  >
                    <CalendarOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                      International Business
                    </Title>
                    <Text className="font-shopee" type="secondary">50 cards</Text>

  
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className="font-shopee hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </Card>
              <Card
                bodyStyle={{ padding: 16 }}
                className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: `${primaryColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                    className="transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  >
                    <CalendarOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                      Bussiness Law
                    </Title>
                    <Text className="font-shopee" type="secondary">50 cards</Text>

  
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className="font-shopee hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </Card>
            </Card>
       
              
          </motion.div>
        </TabPane>

        <TabPane tab="Saved" key="saved">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card
            
              title="Saved Courses"
              style={{ marginBottom: 16 }}
              headStyle={{ backgroundColor: primaryColor, color: whiteColor }}
              className="font-shopee hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <Card
                  style={{ marginBottom: 16 }}
                  bodyStyle={{ padding: 16 }}
                  className="font-shopee-bold hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div style={{ display: "flex", gap: 16 }}>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JIk6sipvv1E2pQuxUTY0REIPHIN45O.png"
                      alt="Digital Strategy course"
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div style={{ flex: 1 }}>
                      <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                        Digital Strategy and Business Opportunity
                      </Title>
                      <Text className="font-shopee" type="secondary">Digital Marketing (FPTU)</Text>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text className="font-shopee">Progress: 1.5/3</Text>
                          <Text className="font-shopee">Ends on Mar 31, 2025</Text>
                        </div>
                        <Progress percent={50} size="small" strokeColor={primaryColor} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Text  className="font-shopee" style={{ display: "block", marginBottom: 8 }}>Week 1 of 3</Text>
                      <Button
                        type="primary"
                        style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                        className="font-shopee hover:scale-105 transition-transform duration-200 hover:shadow-md"
                      >
                        Resume
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                <Card
                  bodyStyle={{ padding: 16 }}
                  style={{ marginBottom: 16 }}
                  className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div style={{ display: "flex", gap: 16 }}>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JIk6sipvv1E2pQuxUTY0REIPHIN45O.png"
                      alt="Digital Leadership course"
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div style={{ flex: 1 }}>
                      <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                        Digital Leadership and Digital Strategy Consultation
                      </Title>
                      <Text className="font-shopee" type="secondary">Digital Marketing (FPTU)</Text>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text className="font-shopee">Progress: 0/3</Text>
                          <Text className="font-shopee">Ends on Mar 17, 2025</Text>
                        </div>
                        <Progress percent={0} size="small" strokeColor={primaryColor} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Text className="font-shopee" style={{ display: "block", marginBottom: 8 }}>Week 0 of 3</Text>
                      <Button
                        type="primary"
                        style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                        className="font-shopee hover:scale-105 transition-transform duration-200 hover:shadow-md"
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <Space>
                <ClockCircleOutlined style={{ color: primaryColor }} />
                <Text className="font-shopee" type="secondary">You can finish this time</Text>
                <Button
                  type="link"
                  style={{ padding: 0, color: primaryColor }}
                  className="font-shopee hover:underline transition-all duration-200"
                >
                  Reset the deadline
                </Button>
              </Space>
            </Card>
          </motion.div>

  
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card
              title="Saved Flashcards"
              headStyle={{ backgroundColor: primaryColor, color: whiteColor }}
              className="font-shopee hover:shadow-lg transition-shadow duration-300"
            >
              <Card
                bodyStyle={{ padding: 16 }}
                className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: `${primaryColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                    }}
                    className="transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  >
                    <CalendarOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Title  className="font-shopee" level={5} style={{ margin: 0 }}>
                      Digital Marketing Terms
                    </Title>
                    <Text className="font-shopee" type="secondary">50 cards</Text>

                    <div style={{ marginTop: 12 }}>
                      <div style={{ marginBottom: 4 }}>
                        <Text className="font-shopee">Progress: 15/50</Text>
                      </div>
                      <Progress percent={30} size="small" strokeColor={primaryColor} />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className="font-shopee-bold hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </Card>
            </Card>
          </motion.div>
        </TabPane>

        <TabPane tab="Sold" key="sold">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card
              title="Shared Library Content"
              style={{ marginBottom: 16 }}
              headStyle={{ backgroundColor: primaryColor, color: whiteColor }}
              className="font-shopee hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <Card
                  style={{ marginBottom: 16 }}
                  bodyStyle={{ padding: 16 }}
                  className="font-shopee-bold hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div style={{ display: "flex", gap: 16 }}>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JIk6sipvv1E2pQuxUTY0REIPHIN45O.png"
                      alt="Digital Strategy course"
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div style={{ flex: 1 }}>
                      <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                        Digital Strategy and Business Opportunity
                      </Title>
                      <Text className="font-shopee" type="secondary">Digital Marketing (FPTU)</Text>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                     
                          <Text className="font-shopee">On Mar 31, 2025</Text>
                        </div>
                
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                  <Button style={{ borderColor: primaryColor, color: primaryColor}} className="font-shopee">View Course</Button>
                </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                <Card
                  bodyStyle={{ padding: 16 }}
                  style={{ marginBottom: 16 }}
                  className="hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div style={{ display: "flex", gap: 16 }}>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JIk6sipvv1E2pQuxUTY0REIPHIN45O.png"
                      alt="Digital Leadership course"
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div style={{ flex: 1 }}>
                      <Title className="font-shopee" level={5} style={{ margin: 0 }}>
                        Digital Leadership and Digital Strategy Consultation
                      </Title>
                      <Text className="font-shopee" type="secondary">Digital Marketing (FPTU)</Text>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            
                          <Text className="font-shopee">On Mar 17, 2025</Text>
                        </div>
                      
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                  <Button style={{ borderColor: primaryColor, color: primaryColor }} className="font-shopee">View Course</Button>
                </div>
                  </div>
                </Card>
              </motion.div>

              <Space>
                <ClockCircleOutlined style={{ color: primaryColor }} />
                <Text className="font-shopee" type="secondary">You can finish this time</Text>
                <Button
                  type="link"
                  style={{ padding: 0, color: primaryColor }}
                  className="font-shopee hover:underline transition-all duration-200"
                >
                  Reset the deadline
                </Button>
              </Space>
            </Card>
          </motion.div>
        </TabPane>
      </StyledTabs>
    </motion.div>
    </div>
   
  )
}

export default MyLearning