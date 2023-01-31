import Link from "next/link"
import React from "react"
import { Container, Row, Col, Breadcrumb } from "react-bootstrap"

export async function getStaticProps() {
  return {
    props: {
      title: "Privacy policy",
    },
  }
}

const Privacy = () => {
  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Customer zone</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading mb-3">Privacy Policy</h1>
            <div>
              <p className="text-muted mb-0">
                Effective date: November 22, 2019
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <Row>
            <Col xl="9" className="text-content">
              <p>
                Henning ("us", "we", or "our") operates the https://example.com
                website (the "Service").
              </p>
              <p>
                This page informs you of our policies regarding the collection,
                use, and disclosure of personal data when you use our Service
                and the choices you have associated with that data. Our Privacy
                Policy for Henning is created with the help of the{" "}
                <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator.php">
                  Free Privacy Policy Generator
                </a>
                .
              </p>
              <p>
                We use your data to provide and improve the Service. By using
                the Service, you agree to the collection and use of information
                in accordance with this policy. Unless otherwise defined in this
                Privacy Policy, terms used in this Privacy Policy have the same
                meanings as in our Terms and Conditions, accessible from
                https://example.com
              </p>
              <h2>Information Collection And Use</h2>
              <p>
                We collect several different types of information for various
                purposes to provide and improve our Service to you.
              </p>
              <hr />
              <h3>Types of Data Collected</h3>
              <h4>Personal Data</h4>
              <p>
                While using our Service, we may ask you to provide us with
                certain personally identifiable information that can be used to
                contact or identify you ("Personal Data"). Personally
                identifiable information may include, but is not limited to:
              </p>
              <ul className="list-icon">
                <li>Email address</li>
                <li>Cookies and Usage Data</li>
              </ul>
              <h4>Usage Data</h4>
              <p>
                We may also collect information how the Service is accessed and
                used ("Usage Data"). This Usage Data may include information
                such as your computer's Internet Protocol address (e.g. IP
                address), browser type, browser version, the pages of our
                Service that you visit, the time and date of your visit, the
                time spent on those pages, unique device identifiers and other
                diagnostic data.
              </p>
              <h4>Tracking & Cookies Data</h4>
              <p>
                We use cookies and similar tracking technologies to track the
                activity on our Service and hold certain information.
              </p>
              <p>
                Cookies are files with small amount of data which may include an
                anonymous unique identifier. Cookies are sent to your browser
                from a website and stored on your device. Tracking technologies
                also used are beacons, tags, and scripts to collect and track
                information and to improve and analyze our Service.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                Service.
              </p>
              <p>Examples of Cookies we use:</p>
              <ul className="list-icon">
                <li>
                  <strong>Session Cookies.</strong> We use Session Cookies to
                  operate our Service.
                </li>
                <li>
                  <strong>Preference Cookies.</strong> We use Preference Cookies
                  to remember your preferences and various settings.
                </li>
                <li>
                  <strong>Security Cookies.</strong> We use Security Cookies for
                  security purposes.
                </li>
              </ul>
              <hr />
              <h2>Use of Data</h2>
              <p>Henning uses the collected data for various purposes:</p>
              <ul className="list-icon">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>
                  To allow you to participate in interactive features of our
                  Service when you choose to do so
                </li>
                <li>To provide customer care and support</li>
                <li>
                  To provide analysis or valuable information so that we can
                  improve the Service
                </li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
              <hr />
              <h2>Transfer Of Data</h2>
              <p>
                Your information, including Personal Data, may be transferred to
                — and maintained on — computers located outside of your state,
                province, country or other governmental jurisdiction where the
                data protection laws may differ than those from your
                jurisdiction.
              </p>
              <p>
                If you are located outside Czech Republic and choose to provide
                information to us, please note that we transfer the data,
                including Personal Data, to Czech Republic and process it there.
              </p>
              <p>
                Your consent to this Privacy Policy followed by your submission
                of such information represents your agreement to that transfer.
              </p>
              <p>
                Henning will take all steps reasonably necessary to ensure that
                your data is treated securely and in accordance with this
                Privacy Policy and no transfer of your Personal Data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of your data and other
                personal information.
              </p>
              <hr />
              <h2>Disclosure Of Data</h2>
              <h3>Legal Requirements</h3>
              <p>
                Henning may disclose your Personal Data in the good faith belief
                that such action is necessary to:
              </p>
              <ul className="list-icon">
                <li>To comply with a legal obligation</li>
                <li>To protect and defend the rights or property of Henning</li>
                <li>
                  To prevent or investigate possible wrongdoing in connection
                  with the Service
                </li>
                <li>
                  To protect the personal safety of users of the Service or the
                  public
                </li>
                <li>To protect against legal liability</li>
              </ul>
              <hr />
              <h2>Security Of Data</h2>
              <p>
                The security of your data is important to us, but remember that
                no method of transmission over the Internet, or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
              </p>
              <hr />
              <h2>Service Providers</h2>
              <p>
                We may employ third party companies and individuals to
                facilitate our Service ("Service Providers"), to provide the
                Service on our behalf, to perform Service-related services or to
                assist us in analyzing how our Service is used.
              </p>
              <p>
                These third parties have access to your Personal Data only to
                perform these tasks on our behalf and are obligated not to
                disclose or use it for any other purpose.
              </p>
              <hr />
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <ul className="list-icon">
                <li>By email: hello@example.com</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Privacy
