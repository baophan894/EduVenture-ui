"use client"

import { Card, Tabs, Progress, Button, Typography, Space, Row, Col } from "antd"
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

      <StyledTabs defaultActiveKey="in-progress" type="card" onChange={(key) => setActiveKey(key)}>
        <TabPane tab="In Progress" key="in-progress">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card
              title="My FPTU Spring 2025 Learning"
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
                      <Title level={5} style={{ margin: 0 }}>
                        Digital Strategy and Business Opportunity
                      </Title>
                      <Text type="secondary">Digital Marketing (FPTU)</Text>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text>Progress: 1.5/3</Text>
                          <Text>Ends on Mar 31, 2025</Text>
                        </div>
                        <Progress percent={50} size="small" strokeColor={primaryColor} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Text style={{ display: "block", marginBottom: 8 }}>Week 1 of 3</Text>
                      <Button
                        type="primary"
                        style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                        className="hover:scale-105 transition-transform duration-200 hover:shadow-md"
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
                      <Title level={5} style={{ margin: 0 }}>
                        Digital Leadership and Digital Strategy Consultation
                      </Title>
                      <Text type="secondary">Digital Marketing (FPTU)</Text>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text>Progress: 0/3</Text>
                          <Text>Ends on Mar 17, 2025</Text>
                        </div>
                        <Progress percent={0} size="small" strokeColor={primaryColor} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Text style={{ display: "block", marginBottom: 8 }}>Week 0 of 3</Text>
                      <Button
                        type="primary"
                        style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                        className="hover:scale-105 transition-transform duration-200 hover:shadow-md"
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <Space>
                <ClockCircleOutlined style={{ color: primaryColor }} />
                <Text type="secondary">You can finish this time</Text>
                <Button
                  type="link"
                  style={{ padding: 0, color: primaryColor }}
                  className="hover:underline transition-all duration-200"
                >
                  Reset the deadline
                </Button>
              </Space>
            </Card>
          </motion.div>

          {/* Replace the "My Flashcards" Card with this animated version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card
              title="My Flashcards"
              headStyle={{ backgroundColor: primaryColor, color: whiteColor }}
              className="hover:shadow-lg transition-shadow duration-300"
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
                    <Title level={5} style={{ margin: 0 }}>
                      Digital Marketing Terms
                    </Title>
                    <Text type="secondary">50 cards</Text>

                    <div style={{ marginTop: 12 }}>
                      <div style={{ marginBottom: 4 }}>
                        <Text>Progress: 15/50</Text>
                      </div>
                      <Progress percent={30} size="small" strokeColor={primaryColor} />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className="hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </Card>
            </Card>
          </motion.div>
        </TabPane>

        <TabPane tab="Complete" key="complete">
          <Card title="Completed Learning" headStyle={{ backgroundColor: primaryColor, color: whiteColor }}>
            <Card bodyStyle={{ padding: 16 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JIk6sipvv1E2pQuxUTY0REIPHIN45O.png"
                  alt="Completed course"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                />
                <div style={{ flex: 1 }}>
                  <Title level={5} style={{ margin: 0 }}>
                    Introduction to Digital Marketing
                  </Title>
                  <Text type="secondary">Digital Marketing (FPTU)</Text>

                  <div style={{ marginTop: 12 }}>
                    <div style={{ marginBottom: 4 }}>
                      <Text>Completed on Feb 15, 2025</Text>
                    </div>
                    <Progress percent={100} size="small" strokeColor={primaryColor} />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Button style={{ borderColor: primaryColor, color: primaryColor }}>View Certificate</Button>
                </div>
              </div>
            </Card>
          </Card>
        </TabPane>

        <TabPane tab="Create" key="create">
          <Card title="Create New Learning" headStyle={{ backgroundColor: primaryColor, color: whiteColor }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card
                  hoverable
                  style={{ textAlign: "center", cursor: "pointer" }}
                  bodyStyle={{ borderTop: `2px solid ${secondaryColor}` }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      backgroundColor: `${primaryColor}20`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <CalendarOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <Title level={5}>Create Flashcard Set</Title>
                  <Text type="secondary">Create a new set of flashcards for your studies</Text>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card
                  hoverable
                  style={{ textAlign: "center", cursor: "pointer" }}
                  bodyStyle={{ borderTop: `2px solid ${secondaryColor}` }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      backgroundColor: `${primaryColor}20`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <ClockCircleOutlined style={{ fontSize: 32, color: primaryColor }} />
                  </div>
                  <Title level={5}>Create Study Plan</Title>
                  <Text type="secondary">Create a customized study plan for your courses</Text>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </StyledTabs>
    </motion.div>
    </div>
   
  )
}

export default MyLearning