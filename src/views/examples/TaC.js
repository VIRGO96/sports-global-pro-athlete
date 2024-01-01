import React, { useState, useEffect } from "react";
import { Button, Container, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function TermsAndConditions(props) {
  const [isMobile, setIsMobile] = useState(false);
  const history = useHistory();
  useEffect(() => {
    updatePredicate();
    window.addEventListener("resize", updatePredicate);
    return () => window.removeEventListener("resize", updatePredicate);
  }, []);
  const updatePredicate = () => {
    setIsMobile(window.innerWidth < 576);
  };
  return (
    <>
      <Container fluid className="mt-3 mb-3">
        <div className="complaint-card ">
          <div className="profile-form ">
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                if (props.location.search.split("?")[1] == "admin") {
                  history.push("/auth/register");
                } else {
                  history.push("/admin/index");
                }
              }}
            >
              Go Back
            </Button>
            <br />
            <Label className="custom-table-heading mt-3">TERMS OF USE</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              Last updated: February 14, 2023
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              These Terms of Use (sometimes referred to herein as the “Terms”)
              constitute a legally binding agreement made between you, whether
              personally or on behalf of an entity (“you”) and FansHelpPlayers,
              LLC ("Company," “FHP,.” “we," “us," or “our”), concerning your
              access to and use of the
              <Link to="https://fans-help-players.web.app/">
                {" "}
                fanshelpplayers.com
              </Link>{" "}
              website as well as any other media form, media channel, mobile
              website or mobile application related, linked, or otherwise
              connected thereto (collectively, the “Site”). You agree that by
              accessing the Site, you have read, understood, and agreed to be
              bound by all of these Terms of Use.
              <br />
              <br />
              Supplemental terms and conditions or documents that may be posted
              on the Site from time to time are hereby expressly incorporated
              herein by reference. We reserve the right, in our sole discretion,
              to make changes or modifications to these Terms of Use at any time
              and for any reason. We will alert you about any changes by
              updating the “Last updated” date of these Terms of Use. It is your
              responsibility to periodically review these Terms of Use to stay
              informed of any updates. You will be subject to, and will be
              deemed to have been made aware of and to have accepted, the
              changes in any revised Terms of Use by your continued use of the
              Site after the date such revised Terms of Use are posted.
              <br />
              <br />
              PLEASE READ THE FOLLOWING TERMS OF USE CAREFULLY BEFORE USING THE
              SITE. BY USING, REGISTERING AN ACCOUNT, AND/OR OTHERWISE ACCESSING
              THE SITE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND
              AGREED TO BE BOUND BY THE FOLLOWING TERMS.
              <br />
              <br />
              BY REGISTERING AN ACOUNT AND/OR OTHERWISE ACCESSING THE SITE, TO
              THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, YOU FURTHER
              AGREE THAT ANY CLAIM, DISPUTE OR CONTROVERSY OF WHATEVER NATURE
              ARISING OUT OF OR RELATING TO THESE TERMS AND/OR YOUR USE OF THE
              SITE SHALL BE RESOLVED BY FINAL AND BINDING ARBITRATION IN
              ACCORDANCE WITH THE DISPUTE RESOLUTION PROCESS DESCRIBED BELOW.
            </Label>
            <Label className="mt-5 custom-table-heading">
              ACCEPTANCE OF TERMS
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              By creating an account and/or otherwise accessing the Site,{" "}
              <strong>
                you explicitly agree to be bound by these Terms of Use and the
                provisions contained herein.
              </strong>{" "}
              If you do not agree to these Terms, then you may not access the
              Site or use its services.
            </Label>
            <Label className="mt-5 custom-table-heading">
              MODIFICATION OF TERMS
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              We reserve the right to issue additional terms and/or otherwise
              modify these Terms as a prerequisite for you to use, or continue
              using, the Site. This may be done, without prior notice to you, by
              posting said changes on the Site. You may be subsequently notified
              of any such changes, and it will be your sole responsibility to
              review and become familiar with any and all changes. At all times
              relevant, the most current version of these Terms will be posted
              on the Site. By continuing to access the Site and/or its services,
              you agree to be bound by any and all additional terms, rule or
              conditions, or any modification to these Terms.
            </Label>
            <Label className="mt-5 custom-table-heading">
              ACCESS TO SERVICES
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              By agreeing to, and remaining in compliance with, these Terms, we
              grant you access to use the Site and its services. All features
              available through the Site may vary depending on the type of
              account you have registered with the Site. We may change features
              from time to time. If you purchase services through your account
              on the Site, we will provide the core features of the services
              during the applicable service period.
            </Label>
            <Label className="mt-5 custom-table-heading">
              AGE RESTRICTIONS
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              The Site is intended for users who are at least 13 years of age.
              All users who are minors in the jurisdiction in which they reside
              (generally under the age of 18) must have the permission of, and
              be directly supervised by, their parent or guardian to use the
              Site. If you are a minor, you must have your parent or guardian
              read and agree to these Terms of Use prior to you using the Site.
              <br />
              <br />
              By granting your child permission to use the Site, you agree and
              understand that you are responsible for monitoring and supervising
              your child's usage. If you believe your child is using the Site
              without your permission, please contact us immediately so that we
              can disable access.
            </Label>
            <Label className="mt-5 custom-table-heading">
              INTELLECTUAL PROPERTY RIGHTS
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics on the Site
              (collectively, the “Content”) and the trademarks, service marks,
              and logos contained therein (the “Marks”) are owned or controlled
              by us or licensed to us, and are protected by copyright and
              trademark laws and various other intellectual property rights and
              unfair competition laws of the United States, international
              copyright laws, and international conventions. The Content and the
              Marks are provided on the Site “AS IS” for your information and
              personal use only. Except as expressly provided in these Terms of
              Use, no part of the Site and no Content or Marks may be copied,
              reproduced, aggregated, republished, uploaded, posted, publicly
              displayed, encoded, translated, transmitted, distributed, sold,
              licensed, or otherwise exploited for any commercial purpose
              whatsoever, without our express prior written permission.
              <br />
              <br />
              Provided that you are eligible to use the Site, you are granted a
              limited license to access and use the Site and to download or
              print a copy of any portion of the Content to which you have
              properly gained access solely for your personal, non-commercial
              use. You acknowledge and agree that your use of the Site and/or
              any of its services does not grant you any ownership to any
              material, content, or data that you may access by or through your
              use of the Site and/or its services. We reserve all rights not
              expressly granted to you in and to the Site, the Content and the
              Marks.
            </Label>
            <Label className="mt-5 custom-table-heading">
              USER REPRESENTATIONS
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              By using the Site and/or otherwise accessing its services, you
              represent and warrant that: (1) all registration information you
              submit will be true, accurate, current, and complete; (2) you will
              maintain the accuracy of such information and promptly update such
              registration information as necessary; (3) you have the legal
              capacity to understand and agree to comply with these Terms of
              Use; (4) you are not under the age of 13; (5) you are not a minor
              in the jurisdiction in which you reside, or if a minor, you have
              received parental permission to use the Site; (6) you will not
              access the Site through automated or non-human means, whether
              through a bot, script, or otherwise; (7) you will not use the Site
              for any illegal or unauthorized purpose; and (8) your use of the
              Site will not violate any applicable law or regulation.
              <br />
              <br />
              If you provide any information that is untrue, inaccurate, not
              current, or incomplete, we have the right to suspend or terminate
              your account and refuse any and all current or future use of the
              Site (or any portion thereof).
            </Label>
            <Label className="mt-5 custom-table-heading">
              USER REGISTRATION
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              You may be required to register an account with the Site in order
              to access its services. You agree to keep your password
              confidential and will be responsible for all use of your account
              and password, regardless of whether these actions were taken by
              you or an unauthorized third party that has gained access to your
              account. By making an account, you agree to receive notices from
              us at the email address provided with your account. We reserve the
              right to remove, reclaim, or change a username you select if we
              determine, in our sole discretion, that such username is
              inappropriate, obscene, in violation of third party intellectual
              property rights, or otherwise objectionable.
            </Label>
            <Label className="mt-5 custom-table-heading">
              PROHIBITED ACTIVITIES
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              You may not access or use the Site for any purpose other than that
              for which we make the Site available. The Site may not be used in
              connection with any commercial endeavors except those that are
              specifically endorsed or approved by us.
              <br />
              <br />
              As a user of the Site, you agree not to:
              <br />
              <br />
              <ul>
                <li>
                  Systematically retrieve data or other content from the Site to
                  create or compile, directly or indirectly, a collection,
                  compilation, database, or directory without written permission
                  from us.
                </li>
                <li>
                  Trick, defraud, or mislead us and other users, especially in
                  any attempt to learn sensitive account information such as
                  user passwords.
                </li>
                <li>
                  Circumvent, disable, or otherwise interfere with
                  security-related features of the Site, including features that
                  prevent or restrict the use or copying of any Content or
                  enforce limitations on the use of the Site and/or the Content
                  contained therein.
                </li>
                <li>
                  Disparage, tarnish, or otherwise harm, in our opinion, us
                  and/or the Site.
                </li>
                <li>
                  Use any information obtained from the Site in order to harass,
                  abuse, or harm another person.
                </li>
                <li>
                  Make improper use of our support services or submit false
                  reports of abuse or misconduct.
                </li>
                <li>
                  Use the Site in a manner inconsistent with any applicable laws
                  or regulations.
                </li>
                <li>
                  Engage in unauthorized framing of or linking to the Site.
                </li>
                <li>
                  Upload or transmit (or attempt to upload or to transmit)
                  viruses, Trojan horses, or other material, including excessive
                  use of capital letters and spamming (continuous posting of
                  repetitive text), that interferes with any party’s
                  uninterrupted use and enjoyment of the Site or modifies,
                  impairs, disrupts, alters, or interferes with the use,
                  features, functions, operation, or maintenance of the Site.
                </li>
                <li>
                  Engage in any automated use of the system, such as using
                  scripts to send comments or messages, or using any data
                  mining, robots, or similar data gathering and extraction
                  tools.
                </li>
                <li>
                  Delete the copyright or other proprietary rights notice from
                  any Content.
                </li>
                <li>
                  Attempt to impersonate another user or person or use the
                  username of another user.
                </li>
                <li>
                  Upload or transmit (or attempt to upload or to transmit) any
                  material that acts as a passive or active information
                  collection or transmission mechanism, including without
                  limitation, clear graphics interchange formats (“gifs”), 1×1
                  pixels, web bugs, cookies, or other similar devices (sometimes
                  referred to as “spyware” or “passive collection mechanisms” or
                  “pcms”).
                </li>
                <li>
                  Interfere with, disrupt, or create an undue burden on the Site
                  or the networks or services connected to the Site.
                </li>
                <li>
                  Harass, annoy, intimidate, or threaten any of our employees or
                  agents engaged in providing any portion of the Site to you.
                </li>
                <li>
                  Attempt to bypass any measures of the Site designed to prevent
                  or restrict access to the Site, or any portion of the Site.
                </li>
                <li>
                  Copy or adapt the Site’s software, including but not limited
                  to Flash, PHP, HTML, JavaScript, or other code.
                </li>
                <li>
                  Except as permitted by applicable law, decipher, decompile,
                  disassemble, or reverse engineer any of the software
                  comprising or in any way making up a part of the Site.
                </li>
                <li>
                  Except as may be the result of standard search engine or
                  Internet browser usage, use, launch, develop, or distribute
                  any automated system, including without limitation, any
                  spider, robot, cheat utility, scraper, or offline reader that
                  accesses the Site, or using or launching any unauthorized
                  script or other software.
                </li>
                <li>
                  Use a buying agent or purchasing agent to make purchases on
                  the Site.
                </li>
                <li>
                  Make any unauthorized use of the Site, including collecting
                  usernames and/or email addresses of users by electronic or
                  other means for the purpose of sending unsolicited email, or
                  creating user accounts by automated means or under false
                  pretenses.
                </li>
                <li>
                  Use the Site as part of any effort to compete with us or
                  otherwise use the Site and/or the Content for any
                  revenue-generating endeavor or commercial enterprise.
                </li>
                <li>
                  Use the Site to advertise or offer to sell goods and services.
                </li>
              </ul>
            </Label>
            <Label className="mt-5 custom-table-heading">
              USER GENERATED CONTRIBUTIONS
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              We may provide you with the opportunity to create, submit, post,
              display, transmit, perform, publish, distribute, or broadcast
              content and materials to us or on the Site, including but not
              limited to text, writings, video, audio, photographs, graphics,
              comments, suggestions, or personal information or other material
              (collectively, "Contributions"). You may only upload Contributions
              that you have the right to upload and share. Contributions may be
              viewable by other users of the Site and through third-party
              websites. As such, any Contributions you transmit may be treated
              in accordance with the Site Privacy Policy. When you create or
              make available any Contributions, you thereby represent and
              warrant that:
              <br />
              <br />
              <ul>
                <li>
                  The creation, distribution, transmission, public display, or
                  performance, and the accessing, downloading, or copying of
                  your Contributions do not and will not infringe the
                  proprietary rights, including but not limited to the
                  copyright, patent, trademark, trade secret, or moral rights of
                  any third party.
                </li>
                <li>
                  You are the creator and owner of, or have the necessary
                  licenses, rights, consents, releases, and permissions to use
                  and to authorize us, the Site, and other users of the Site to
                  use your Contributions in any manner contemplated by the Site
                  and these Terms of Use.
                </li>
                <li>
                  You have the written consent, release, and/or permission of
                  each and every identifiable individual person in your
                  Contributions to use the name or likeness of each and every
                  such identifiable individual person to enable inclusion and
                  use of your Contributions in any manner contemplated by the
                  Site and these Terms of Use.
                </li>
                <li>
                  Your Contributions are not false, inaccurate, or misleading.
                </li>
                <li>
                  Your Contributions are not unsolicited or unauthorized
                  advertising, promotional materials, pyramid schemes, chain
                  letters, spam, mass mailings, or other forms of solicitation.
                </li>
                <li>
                  Your Contributions are not obscene, lewd, lascivious, filthy,
                  violent, harassing, libelous, slanderous, or otherwise
                  objectionable (as determined by us).
                </li>
                <li>
                  Your Contributions do not ridicule, mock, disparage,
                  intimidate, or abuse anyone.
                </li>
                <li>
                  Your Contributions are not used to harass or threaten (in the
                  legal sense of those terms) any other person and to promote
                  violence against a specific person or class of people.
                </li>
                <li>
                  Your Contributions do not violate any applicable law,
                  regulation, or rule.
                </li>
                <li>
                  Your Contributions do not violate the privacy or publicity
                  rights of any third party.
                </li>
                <li>
                  Your Contributions do not violate any applicable law
                  concerning child pornography, or otherwise intended to protect
                  the health or well-being of minors.
                </li>
                <li>
                  Your Contributions do not include any offensive comments that
                  are connected to race, national origin, gender, sexual
                  preference, or physical handicap.
                </li>
                <li>
                  Your Contributions do not otherwise violate, or link to
                  material that violates, any provision of these Terms of Use,
                  or any applicable law or regulation.
                </li>
              </ul>
              <br />
              Any use of the Site in violation of the foregoing violates these
              Terms of Use and may result in, among other things, termination or
              suspension of your rights to use the Site and/or otherwise access
              its services.
              <br />
              <br />
              You acknowledge that all Contributions are created, selected, and
              provided by the uploading party and not by Company. We are not
              responsible for reviewing or moderating Contributions, and we do
              not select or modify Contributions that is stored or transmitted
              via the Site.
              <br />
              <br />
              We reserve the right (but are not obligated) to moderate or review
              any Contributions to verify compliance with these Terms and/or any
              applicable law.
              <br />
              <br />
              We reserve the right to suspend access to any Contributions posted
              on the Website if we become aware that such Contributions may not
              comply with these Terms and/or any applicable law whilst we
              investigate the suspected non-compliance or unlawfulness of such
              Contributions. If we suspend access to any Contributions, the
              uploading party may request a review of our decision to suspend
              access to the Contributions by contacting us at
              FansHelpPlayers@gmail.com. Following our investigation of the
              suspected non-compliance or unlawfulness of the Contributions, we
              may take any action we consider appropriate, including reinstating
              access to Contributions or permanently removing or disabling
              access to the Contributions without needing to obtain any consent
              from the uploading party and without giving any prior notice. The
              uploading party agrees to, at their own cost, promptly provide to
              us all reasonable assistance (including by providing us with
              copies of any information which we request) in our investigation.
              We will not be responsible for any loss suffered by you arising
              from the suspension of access to Contributions or any other steps
              which we take in good faith to investigate any suspected
              non-compliance or unlawfulness of Contributions under this
              section.
              <br />
              <br />
              If we suspend access to or delete any of Contributions, we will
              notify the uploading party via email or electronic message to your
              account, but we are not obligated to give you prior notice of such
              removal or suspension.
            </Label>
            <Label className="mt-5 custom-table-heading">
              CONTRIBUTION LICENSE
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              We do not assert any ownership over your Contributions. You retain
              full ownership of all of your Contributions and any intellectual
              property rights, or other proprietary rights associated with your
              Contributions. We are not liable for any statements or
              representations in your Contributions provided by you in any area
              on the Site. You are solely responsible for your Contributions to
              the Site and you expressly agree to exonerate us from any and all
              responsibility and to refrain from any legal action against us
              regarding your Contributions.
              <br />
              <br />
              Copyright owners may send us a takedown notice in compliance with
              these Terms if they believe your Contributions constitute
              infringing materials. You must ensure that all Contributions
              shared by you comply with these Terms. We may (but are not
              obligated to) monitor your account, Contributions, and conduct,
              regardless of your privacy settings. We may take all appropriate
              actions to enforce our rights including removing specific
              Contributions or suspending or removing your account for violation
              of these Terms
              <br />
              <br />
              By uploading, publishing, modifying, or displaying material on the
              Website (including, without limitation, Contributions), you
              automatically grant, and further warrant and represent that you
              have the right and/or necessary licenses, to grant, us an
              irrevocable, worldwide, perpetual, non-exclusive, transferable,
              fully sub-licensable license to copy, distribute, reproduce,
              publicly perform or display, reformat, transmit, translate, create
              derivative works of or incorporate into other works Contributions
              for any purpose on or in connection with the Site, or the
              promotion thereof.
            </Label>
            <Label className="mt-5 custom-table-heading">
              DMCA NOTIFICATION AND PROCEDURE
            </Label>
            <Label className="mt-3 custom-checkbox-label text-dark">
              We utilize our best efforts to comply with the Digital Millennium
              Copyright Act (DMCA). As a result, we reserve the right to remove
              any material that is or may be infringing upon any third party’s
              rights at any time, without prior notice to you. Company also
              reserves the right to terminate your access to the Site, at any
              time without prior notice to you, for repeat violations. By using
              and/or uploading any material to the Site, you warrant and
              represent that such materials (including, but not limited to,
              Contributions) does not infringe upon any and all intellectual
              property rights of a third party, including, but not limited to,
              any such rights pursuant to registered or unregistered copyrights,
              trademarks, patents, trade secrets, or any other proprietary
              information, whether it be at common law, by statute or under the
              terms of DMCA, as amended.
              <br />
              <br />
              If you believe that your work has been copied on or through the
              Site in a way that may constitutes copyright infringement, you may
              submit a notification to our designated Copyright Agent containing
              the following information:
              <br />
              <br />
              <ul>
                <li>Your name and email address;</li>
                <li>
                  A description of the copyrighted work alleged to have been
                  infringed;
                </li>
                <li>
                  A description of where the alleged infringing material is
                  located on the Site;
                </li>
                <li>
                  A statement expressing your good faith belief that the alleged
                  use in question is not authorized by the rightful copyright
                  owner, its authorized agent, or law;
                </li>
                <li>
                  A signature (electronic or physical) of the person authorized
                  to act on behalf of the rightful owner of the copyrighted
                  material; and
                </li>
                <li>
                  A statement made under penalty of perjury that the above
                  information listed in your DMCA notification is truthful and
                  accurate, and that you are the rightful owner or are
                  authorized to act on behalf of the rightful copyright owner.
                </li>
              </ul>
              <br />
              Pursuant to the DMCA, Company may reinstate material if we receive
              a counter notification from the provider of the removed material.
              If you are the provider of the removed material, you may submit a
              counter notification that must include the following:
              <br />
              <br />
              <ul>
                <li>
                  The URL relating to the material that we removed or disabled
                  access to;
                </li>
                <li>Your name, address, telephone number and email address;</li>
                <li>
                  A statement saying that you consent to the jurisdiction of the
                  Federal District Court for the judicial district in which your
                  address is located (or Broward County, Florida if your address
                  is outside of the United States), and that you will accept
                  service of process from the person or authorized agent who
                  provided the initial DMCA notification to take down the
                  material;
                </li>
                <li>
                  A statement expressing your good faith belief, under penalty
                  of perjury, that the material removed or disabled was the
                  result of a mistake or misidentification of the material to be
                  removed or disabled, or that the exact material identified by
                  the person or authorized agent who sent the initial DMCA
                  notification has been removed or disabled at the identified
                  URL and will be no longer shown; and
                </li>
                <li>
                  A signature (electronic or physical) by you or your authorized
                  agent/representative.
                </li>
              </ul>
              FOR DMCA NOTIFICATIONS AND COUNTER NOTIFICATIONS ONLY:
              <br />
              Copyright Agent:
              <br />
              HEITNER LEGAL, P.L.L.C.
              <br />
              Phone: 954-558-6999
              <br />
              <a href="mailto:Darren@heitnerlegal.com" target="_blank">
                Email: Darren@heitnerlegal.com
              </a>
              <br />
              <br />
              Please note that you, and you alone, will be liable for any
              damages (including attorney’s fees and costs) if you materially
              represent that your material and/or activity is not infringing
              upon the copyrights of others. If you are not sure if your
              material and/or activity constitute copyright infringement, please
              consult an attorney.
            </Label>
            <Label className="mt-5 custom-table-heading">
              MOBILE APPLICATION LICENSE
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              <h3 className="text-dark">Use License</h3>
              <br />
              If you access the Site via a mobile application, then we grant you
              a revocable, non-exclusive, non-transferable, limited right to
              install and use the mobile application on wireless electronic
              devices owned or controlled by you, and to access and use the
              mobile application on such devices strictly in accordance with the
              terms and conditions of this mobile application license contained
              in these Terms of Use. You shall not: (1) except as permitted by
              applicable law, decompile, reverse engineer, disassemble, attempt
              to derive the source code of, or decrypt the application; (2) make
              any modification, adaptation, improvement, enhancement,
              translation, or derivative work from the application; (3) violate
              any applicable laws, rules, or regulations in connection with your
              access or use of the application; (4) remove, alter, or obscure
              any proprietary notice (including any notice of copyright or
              trademark) posted by us or the licensors of the application; (5)
              use the application for any revenue generating endeavor,
              commercial enterprise, or other purpose for which it is not
              designed or intended; (6) make the application available over a
              network or other environment permitting access or use by multiple
              devices or users at the same time; (7) use the application for
              creating a product, service, or software that is, directly or
              indirectly, competitive with or in any way a substitute for the
              application; (8) use the application to send automated queries to
              any website or to send any unsolicited commercial e-mail; or (9)
              use any proprietary information or any of our interfaces or our
              other intellectual property in the design, development,
              manufacture, licensing, or distribution of any applications,
              accessories, or devices for use with the application.
              <br />
              <br />
              <h3 className="text-dark">Apple and Android Devices</h3>
              <br />
              The following terms apply when you use a mobile application
              obtained from either the Apple Store or Google Play (each an “App
              Distributor”) to access the Site: (1) the license granted to you
              for our mobile application is limited to a non-transferable
              license to use the application on a device that utilizes the Apple
              iOS or Android operating systems, as applicable, and in accordance
              with the usage rules set forth in the applicable App Distributor’s
              terms of service; (2) we are responsible for providing any
              maintenance and support services with respect to the mobile
              application as specified in the terms and conditions of this
              mobile application license contained in these Terms of Use or as
              otherwise required under applicable law, and you acknowledge that
              each App Distributor has no obligation whatsoever to furnish any
              maintenance and support services with respect to the mobile
              application; (3) in the event of any failure of the mobile
              application to conform to any applicable warranty, you may notify
              the applicable App Distributor, and the App Distributor, in
              accordance with its terms and policies, may refund the purchase
              price, if any, paid for the mobile application, and to the maximum
              extent permitted by applicable law, the App Distributor will have
              no other warranty obligation whatsoever with respect to the mobile
              application; (4) you represent and warrant that (i) you are not
              located in a country that is subject to a U.S. government embargo,
              or that has been designated by the U.S. government as a “terrorist
              supporting” country and (ii) you are not listed on any U.S.
              government list of prohibited or restricted parties; (5) you must
              comply with applicable third-party terms of agreement when using
              the mobile application, e.g., if you have a VoIP application, then
              you must not be in violation of their wireless data service
              agreement when using the mobile application; and (6) you
              acknowledge and agree that the App Distributors are third-party
              beneficiaries of the terms and conditions in this mobile
              application license contained in these Terms of Use, and that each
              App Distributor will have the right (and will be deemed to have
              accepted the right) to enforce the terms and conditions in this
              mobile application license contained in these Terms of Use against
              you as a third-party beneficiary thereof.
            </Label>
            <Label className="mt-5 custom-table-heading">SUBMISSIONS</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              You acknowledge and agree that any questions, comments,
              suggestions, ideas, feedback, or other information regarding the
              Site ("Submissions") provided by you to us are non-confidential
              and shall become our sole property. We shall own exclusive rights,
              including all intellectual property rights, and shall be entitled
              to the unrestricted use and dissemination of these Submissions for
              any lawful purpose, commercial or otherwise, without
              acknowledgment or compensation to you. You hereby waive all moral
              rights to any such Submissions, and you hereby warrant that any
              such Submissions are original with you or that you have the right
              to submit such Submissions. You agree there shall be no recourse
              against us for any alleged or actual infringement or
              misappropriation of any proprietary right in your Submissions.
            </Label>
            <Label className="mt-5 custom-table-heading">ADVERTISERS</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              We allow advertisers to display their advertisements and other
              information in certain areas of the Site, such as sidebar
              advertisements or banner advertisements. If you are an advertiser,
              you shall take full responsibility for any advertisements you
              place on the Site and any services provided on the Site or
              products sold through those advertisements. Further, as an
              advertiser, you warrant and represent that you possess all rights
              and authority to place advertisements on the Site, including, but
              not limited to, intellectual property rights, publicity rights,
              and contractual rights. We simply provide the space to place such
              advertisements, and we have no other relationship with
              advertisers.
              <br />
              <br />
              Company is not responsible, nor does it have any control, over the
              information, content, accuracy, products, services, advertising,
              or other materials that may or may not be provided by or through
              advertisers. Third party websites and/or links are not
              investigated, monitored, or checked for accuracy or completeness.
              Linking to, or being linked from an advertiser, does not
              constitute, nor should it be construed to imply Company’s approval
              or endorsement of the advertiser. We cannot and will not guarantee
              the standards of any advertiser to which links are provided, nor
              shall we be held responsible for the materials and content on such
              websites, or any subsequent links. Any reliance on or use of the
              materials or content found on or by way of advertisers is done
              solely at your own risk, and you assume all responsibilities and
              consequences resulting from such reliance.
            </Label>
            <Label className="mt-5 custom-table-heading">SITE MANAGEMENT</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              We reserve the right, but not the obligation, to: (1) monitor the
              Site for violations of these Terms of Use; (2) take appropriate
              legal action against anyone who, in our sole discretion, violates
              the law or these Terms of Use, including without limitation,
              reporting such user to law enforcement authorities; (3) in our
              sole discretion and without limitation, refuse, restrict access
              to, limit the availability of, or disable (to the extent
              technologically feasible) any of your Contributions or any portion
              thereof; (4) in our sole discretion and without limitation,
              notice, or liability, remove from the Site or otherwise disable
              all files and content that are excessive in size or are in any way
              burdensome to our systems; and (5) otherwise manage the Site in a
              manner designed to protect our rights and property and to
              facilitate the proper functioning of the Site. Notwithstanding the
              foregoing, you acknowledge that we are not responsible for any
              materials (including, without limitation, Contributions) posted by
              users of the Site.
            </Label>
            <Label className="mt-5 custom-table-heading">PRIVACY POLICY</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              We care about data privacy and security. By using the Site, you
              agree to be bound by our Privacy Policy, which is incorporated
              into these Terms of Use. Please be advised the Site is hosted in
              the United States. If you access the Site from any other region of
              the world with laws or other requirements governing personal data
              collection, use, or disclosure that differ from applicable laws in
              the United States, then through your continued use of the Site,
              you are transferring your data to the United States, and you agree
              to have your data transferred to and processed in the United
              States. Further, we do not knowingly accept, request, or solicit
              information from children or knowingly market to children.
              Therefore, in accordance with the U.S. Children’s Online Privacy
              Protection Act, if we receive actual knowledge that anyone under
              the age of 13 has provided personal information to us without the
              requisite and verifiable parental consent, we will delete that
              information from the Site as quickly as is reasonably practical.
            </Label>
            <Label className="mt-5 custom-table-heading">
              TERM AND TERMINATION
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              These Terms of Use shall remain in full force and effect while you
              use the Site.
              <br />
              <br />
              WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE
              RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR
              LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING
              CERTAIN IP ADDRESSES) TO ANY PERSON FOR ANY REASON OR FOR NO
              REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
              REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF
              USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR
              USE OR PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND ANY
              CONTRIBUTIONS OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT
              WARNING, IN OUR SOLE DISCRETION.
              <br />
              <br />
              If we terminate or suspend your account for any reason, you are
              prohibited from registering and creating a new account under your
              name, a fake or borrowed name, or the name of any third party,
              even if you may be acting on behalf of the third party. In
              addition to terminating or suspending your account, we reserve the
              right to take appropriate legal action, including without
              limitation pursuing civil, criminal, and injunctive redress.
            </Label>
            <Label className="mt-5 custom-table-heading">
              MODIFICATIONS AND INTERRUPTIONS
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              We reserve the right to change, modify, or remove the contents of
              the Site at any time or for any reason at our sole discretion
              without notice. However, we have no obligation to update any
              information on our Site. We also reserve the right to modify or
              discontinue all or part of the Site without notice at any time. We
              will not be liable to you or any third party for any modification,
              price change, suspension, or discontinuation of the Site.
              <br />
              <br />
              We cannot guarantee that the Site will be available at all times.
              We may experience hardware, software, or other problems or need to
              perform maintenance related to the Site, resulting in
              interruptions, delays, or errors. We reserve the right to change,
              revise, update, suspend, discontinue, or otherwise modify the Site
              at any time or for any reason without notice to you. You agree
              that we have no liability whatsoever for any loss, damage, or
              inconvenience caused by your inability to access or use the Site
              during any downtime or discontinuance of the Site. Nothing in
              these Terms of Use will be construed to obligate us to maintain
              and support the Site or to supply any corrections, updates, or
              releases in connection therewith.
            </Label>
            <Label className="mt-5 custom-table-heading">
              ATHLETE VERIFICATION; TERMS OF LICENSE PURCHASE AND USE
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              By accessing the Site and/or its services, you also agree to the
              following terms and conditions:
              <br />
              <br />
              <ul>
                <li>
                  You acknowledge that multiple persons can register an account
                  on the Site under same athlete name, and under same amateur
                  athlete playing address, and that there is a risk that persons
                  registered on the Site might be falsely registered, as in an
                  attempt to deceive you into believing the registered person is
                  an amateur athlete, when the registered person is in fact an
                  imposter. You further acknowledge Company is not responsible
                  to prevent, nor liable for damages related to, such potential
                  false registration.
                </li>
                <li>
                  You acknowledge that it is your sole responsibility to take
                  advantage of available means for identifying and interacting
                  with the true-identity registrants on the Site, while
                  identifying and avoiding buying a license from any
                  false-identity registrant on the Site.
                </li>
                <li>
                  You acknowledge that among the means available to users for
                  making the distinction between true-identity registrants on
                  the Site from false-identity registrants are: (i) Site data
                  such as assigned FHP athlete number provided by Company, (ii)
                  communications occurring off-Site, such as by Skype calls, and
                  (iii) other social verification means such as reviewing
                  Twitter accounts and the like.
                </li>
                <li>
                  You acknowledge that by a FHP-registered amateur athlete
                  making known his or her assigned FHP athlete number by posting
                  it on Twitter or on other social media, a diligent prospective
                  Site user might more easily research the matter. Such true
                  postings can assist user in determining who is the true
                  FHP-registered amateur athlete from whom the user wishes to
                  purchase a license on the Site.
                </li>
                <li>
                  You acknowledge that you are responsible to make and will make
                  before purchase of a license, adequate verification of the
                  FHP-registered amateur athlete’s identity to prevent buying
                  license from unintended non-athlete seller. Such verification
                  is to be carried out each time before you purchase a license
                  on the Site. Failure to adequately do so renders void any
                  claim by you against Company for the purpose of such license.
                </li>
              </ul>
              <br />
              <h3 className="text-dark">Licensor Obligations</h3>
              <br />
              The Valid Licensor of any license purchased via the Site is
              understood to be the true-identity amateur athlete validly
              registered on the Site. You acknowledge that said amateur athlete
              by such valid registration is validly purporting to be the
              licensor of any and all rights purchased, and that a validly
              FHP-registered license-seller attests by his or her valid
              registration that he or she can sell such license for use of his
              or her own name without endangering his or her amateur status.
              <br />
              <br />
              You acknowledge that it is the responsibility of the
              FHP-registered amateur athlete to verify he or she is free to sell
              a license, and that he or she can do so without endangering his or
              her amateur status. All users acknowledge that it is not the
              responsibility of Company to verify the amateur athlete is free to
              sell a license, or that such sale would not endanger said
              license-selling athlete’s amateur status.
              <br />
              <br />
              Said valid licensor, by validly offering a license for sale on the
              Site, asserts he or she has registered an account on the Site
              under his or her own name, and further verifies that all
              registration data supplied by said valid licensor to the Site is
              correct.
              <br />
              <br />
              Licensors agree to hold Company harmless as regards their
              registration on the Site and as regards any licenses they may sell
              via the Site.
              <br />
              <br />
              <h3 className="text-dark">Licensee Obligations</h3>
              <br />
              The Valid Licensee is the user who pays money to an FHP
              website-registered license seller for a license. A FHP valid
              seller is defined as a validly registered amateur athlete whose
              identity has been adequately verified by at least one valid FHP
              buyer prior to said buyer buying a license from said FHP seller. A
              FHP valid buyer is defined as a FHP-registered person paying a FHP
              valid seller for a license after said buyer adequately verifies
              identity of said amateur athlete.
              <br />
              <br />
              All sales are final. You acknowledge that no refund will be made
              by Company after buyer purchases a license on the Site. The no
              refund policy applies to all sales, even in circumstances where
              buyer later discovers seller registered on FHP who sold a license
              to a buyer is not the amateur athlete who was sought by buyer.
              <br />
              <br />
              <h3 className="text-dark">License Terms</h3>
              <br />
              The intellectual property herein licensed pursuant to the valid
              sale and valid purchase between FHP valid buyer and FHP valid
              seller comprises the limited right to use in display amateur
              athlete’s name, image, and likeness (“Athlete’s NIL”). Use of
              Athlete’s NIL is valid wherein the NIL is that of FHP valid seller
              who is adequately identity-verified by a valid buyer prior to said
              buyer purchasing said license.
              <br />
              <br />
              An offer to sell a license on the Site in name of an amateur
              athlete does not guarantee that said amateur athlete is the
              person, or one of the persons, registered under that name with the
              Site, or that a particular amateur athlete sought by buyer is the
              person who is offering to sell a license.
              <br />
              <br />
              All FHP valid buyers acknowledge that each buyer is responsible to
              adequately verify the identity of a seller prior to buyer
              purchasing a license from said seller on the Site. Buyer
              acknowledges Company has no responsibility to provide proof of
              identity of any Site-registered seller.
              <br />
              <br />
              The purpose of a valid license is to grant limited time use of the
              Athlete’s NIL. Buyers acknowledge that any license they purchase
              on the Site from a seller they have not personally adequately
              identity-verified might not be a valid license. Buyers acknowledge
              that such inadequately identity-verified purchases are not subject
              to refund.
              <br />
              <br />
              The Term of a valid license is defined as the number of days a
              valid licensee is authorized to display, on the licensee’s social
              media page(s), a medallion reflecting the valid license. The
              number of days of such authorized display is agreed to be seven
              (7) days of said display authorized per each dollar spent by said
              valid buyer in said purchase of said valid license.
              <br />
              <br />
              All valid buyers and all valid sellers acknowledge that the price
              for a license, such as displayed as dollar value on medallion,
              shall be greater than the actual amount paid to valid seller for
              said license. The actual amount paid to seller shall reflect a
              deduction for Company’s service charge. Such service charge shall
              be in the range of ten percent (10%) to fifty percent (50%) of the
              price of the license as displayed on medallion.
              <br />
              <br />
              The sale and purchase of a license via the Site constitutes a
              binding license agreement per terms herein disclosed. All users
              acknowledge that by selling a license on the Site, the seller
              agrees to the above terms. All users acknowledge that by buying a
              license on the Site, the buyer agrees to the above terms.
              <br />
              <br />
              To the extent permitted by applicable law, you hereby waive any
              provision of law which prohibits or renders void or unenforceable
              any provision of the above license terms. If the invalidity of any
              part, provision, representation, or warranty of this Agreement
              shall deprive any party of the economic benefit intended to be
              conferred by this Agreement, the parties shall negotiate, in good
              faith, to develop a structure the economic effect of which is as
              close as possible to the economic effect of this Agreement without
              regard to such invalidity.
            </Label>
            <Label className="mt-5 custom-table-heading">GOVERNING LAW</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              These Terms of Use and your use of the Site are governed by and
              construed in accordance with the laws of the State of Florida,
              without regard to its conflict of law principles.
            </Label>
            <Label className="mt-5 custom-table-heading">
              DISPUTE RESOLUTION
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              <h3 className="text-dark">Informal Negotiations</h3>
              <br />
              To expedite resolution and control the cost of any dispute,
              controversy, or claim related to these Terms of Use (each, a
              "Dispute" and collectively, the “Disputes”) brought by either you
              or us (individually, a “Party” and collectively, the “Parties”),
              the Parties agree to first attempt to negotiate any Dispute
              (except those Disputes expressly provided below) informally for at
              least thirty (30) days before initiating arbitration. Such
              informal negotiations commence upon written notice from one Party
              to the other Party.
              <br />
              <br />
              <h3 className="text-dark">Binding Arbitration</h3>
              <br />
              If the Parties are unable to resolve a Dispute through informal
              negotiations, the Dispute (except those Disputes expressly
              excluded below) will be finally and exclusively resolved through
              binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION,
              YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL.
              The arbitration shall be commenced and conducted under the
              Commercial Arbitration Rules of the American Arbitration
              Association ("AAA") and, where appropriate, the AAA’s
              Supplementary Procedures for Consumer Related Disputes ("AAA
              Consumer Rules"), both of which are available at the AAA website:
              www.adr.org. Your arbitration fees and your share of arbitrator
              compensation shall be governed by the AAA Consumer Rules and,
              where appropriate, limited by the AAA Consumer Rules. The
              arbitration may be conducted in person, through the submission of
              documents, by phone, or online. The arbitrator will make a
              decision in writing, but arbitrator need not provide a statement
              of reasons unless requested by either Party. The arbitrator must
              follow applicable law, and any award may be challenged if the
              arbitrator fails to do so. Except where otherwise required by the
              applicable AAA rules or applicable law, the arbitration will take
              place in West Palm Beach, Florida. Except as otherwise provided
              herein, the Parties may litigate in court to compel arbitration,
              stay proceedings pending arbitration, or to confirm, modify,
              vacate, or enter judgment on the award entered by the arbitrator.
              <br />
              <br />
              If for any reason, a Dispute proceeds in court rather than
              arbitration, the Dispute shall be commenced or prosecuted in the
              state and federal courts located in West Palm Beach, Florida, and
              the Parties hereby consent to, and waive all defenses of lack of
              personal jurisdiction, and forum non conveniens with respect to
              venue and jurisdiction in such state and federal courts.
              Application of the United Nations Convention on Contracts for the
              International Sale of Goods and the Uniform Computer Information
              Transaction Act (UCITA) is excluded from these Terms of Use.
              <br />
              <br />
              If this provision is found to be illegal or unenforceable, then
              neither Party will elect to arbitrate any Dispute falling within
              that portion of this provision found to be illegal or
              unenforceable, and such Dispute shall be decided by a court of
              competent jurisdiction within the courts listed for jurisdiction
              above, and the Parties agree to submit to the personal
              jurisdiction of that court.
              <br />
              <br />
              <h3 className="text-dark">Class Action Waiver</h3>
              <br />
              The Parties agree that any arbitration shall be limited to the
              Dispute between the Parties individually. To the fullest extent
              permitted by law, (a) no arbitration shall be joined with any
              other proceeding; (b) there is no right or authority for any
              Dispute to be arbitrated on a class-action basis or to utilize
              class action procedures; and (c) there is no right or authority
              for any Dispute to be brought in a purported representative
              capacity on behalf of the general public or any other persons.
              <br />
              <br />
              <h3 className="text-dark">
                Exceptions to Informal Negotiations and Arbitration
              </h3>
              <br />
              The Parties agree that the following Disputes are not subject to
              the above provisions concerning informal negotiations and binding
              arbitration: (a) any Disputes seeking to enforce or protect, or
              concerning the validity of, any of the intellectual property
              rights of a Party; (b) any Dispute related to, or arising from,
              allegations of theft, piracy, invasion of privacy, or unauthorized
              use; and (c) any claim for injunctive relief. If this provision is
              found to be illegal or unenforceable, then neither Party will
              elect to arbitrate any Dispute falling within that portion of this
              provision found to be illegal or unenforceable and such Dispute
              shall be decided by a court of competent jurisdiction within the
              courts listed for jurisdiction above, and the Parties agree to
              submit to the personal jurisdiction of that court.
            </Label>
            <Label className="mt-5 custom-table-heading">CORRECTIONS</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              There may be information on the Site that contains typographical
              errors, inaccuracies, or omissions, including descriptions,
              pricing, availability, and various other information. We reserve
              the right to correct any errors, inaccuracies, or omissions and to
              change or update the information on the Site at any time, without
              prior notice.
            </Label>
            <Label className="mt-5 custom-table-heading">DISCLAIMER</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              The Site is provided on an as-is and as-available basis. You agree
              that your use of the Site and our services will be at your sole
              risk. To the fullest extent permitted by law, we disclaim all
              warranties, express or implied, in connection with the Site and
              your use thereof, including, without limitation, the implied
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement. We make no warranties or representations
              about the accuracy or completeness of the Site’s content or the
              content of any advertisers or third party websites linked to the
              Site and we will assume no liability or responsibility for any (1)
              errors, mistakes, or inaccuracies of content and materials, (2)
              personal injury or property damage, of any nature whatsoever,
              resulting from your access to and use of the Site, (3) any
              unauthorized access to or use of our secure servers and/or any and
              all personal information and/or financial information stored
              therein, (4) any interruption or cessation of transmission to or
              from the Site, (5) any bugs, viruses, trojan horses, or the like
              which may be transmitted to or through the Site by any third
              party, and/or (6) any errors or omissions in any content and
              materials or for any loss or damage of any kind incurred as a
              result of the use of any content posted, transmitted, or otherwise
              made available via the Site. We do not warrant, endorse,
              guarantee, or assume responsibility for any product or service
              advertised or offered by a third party through the Site, any
              hyperlinked website, or any website or mobile application featured
              in any banner or other advertising, and we will not be a party to
              or in any way be responsible for monitoring any transaction
              between you and any third-party providers of products or services.
              As with the purchase of a product or service through any medium or
              in any environment, you should use your best judgment and exercise
              caution where appropriate.
            </Label>
            <Label className="mt-5 custom-table-heading">
              LIMITATIONS OF LIABILITY
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              In no event will we or our directors, employees, or agents be
              liable to you or any third party for any direct, indirect,
              consequential, exemplary, incidental, special, or punitive
              damages, including lost profit, lost revenue, loss of data, or
              other damages arising from your use of the site, even if we have
              been advised of the possibility of such damages. Notwithstanding
              anything to the contrary contained herein, our liability to you
              for any cause whatsoever and regardless of the form of the action,
              will at all times be limited to the amount paid, if any, by you to
              us during the six (6) month period prior to any cause of action
              arising. Certain state laws and international laws do not allow
              limitations on implied warranties or the exclusion or limitation
              of certain damages. If these laws apply to you, some or all of the
              above disclaimers or limitations may not apply to you, and you may
              have additional rights.
            </Label>
            <Label className="mt-5 custom-table-heading">
              TAXES: PAYMENT, ACCOUNTING AND WITHHOLDING
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              All deliverables from online sales made on the Site are
              digital-only goods. Online sales of digital-only goods have been
              declared to be non-taxable sales, such as per the State of
              Florida. Furthermore, FHP hereby notifies all users that FHP does
              not provide tax accounting service for users. Furthermore, FHP
              hereby notifies all users that FHP does not withhold funds for
              users to later pay their tax liabilities. FHP is not an employer
              of any athlete user of FHP services. FHP has no responsibility to
              report user earnings, such as by athlete using FHP site/services.
              FHP has no responsibility to report user earnings from sale of
              digital-only goods on the Site. Each FHP user is on notice to
              arrange their own tax accounting, tax reporting and tax
              withholding and/or tax paying. FHP and its affiliates do not
              provide tax, legal or accounting advice. This material has been
              prepared for informational purposes only. This material should not
              be relied on for tax, legal or accounting advice. You should
              consult your own tax, legal and accounting advisors before
              engaging in any transaction. While FHP endeavors to keep the
              information up-to-date and accurate, FHP makes no representations
              or warranties of any kind, express or implied, about the
              completeness, accuracy, reliability, suitability, or availability
              with respect to the Site or the information, products, services,
              or related graphics contained on the Site for any purpose.
            </Label>
            <Label className="mt-5 custom-table-heading">INDEMNIFICATION</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              You agree to defend, indemnify, and hold us harmless, including
              our subsidiaries, affiliates, and all of our respective officers,
              agents, partners, and employees, from and against any loss,
              damage, liability, claim, or demand, including reasonable
              attorneys’ fees and expenses, made by any third party due to or
              arising out of: (1) use of the Site; (2) breach of these Terms of
              Use; (3) any breach of your representations and warranties set
              forth in these Terms of Use; (4) your violation of the rights of a
              third party, including but not limited to intellectual property
              rights; or (5) any overt harmful act toward any other user of the
              Site with whom you connected via the Site. Notwithstanding the
              foregoing, we reserve the right, at your expense, to assume the
              exclusive defense and control of any matter for which you are
              required to indemnify us, and you agree to cooperate, at your
              expense, with our defense of such claims. We will use reasonable
              efforts to notify you of any such claim, action, or proceeding
              which is subject to this indemnification upon becoming aware of
              it.
            </Label>
            <Label className="mt-5 custom-table-heading">USER DATA</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              We will maintain certain data that you transmit to the Site for
              the purpose of managing the performance of the Site, as well as
              data relating to your use of the Site. Additionally, you
              acknowledge that we may use your information to: (i) investigate
              any suspected or alleged misuse, abuse, or unlawful use of the
              Site and cooperate with law enforcement agencies in such
              investigation, and/or (ii) assist law enforcement agencies in
              connection with any law enforcement investigation of any suspected
              or alleged illegal activity, to protect our rights or legal
              interests, or in response to legal process. Although we perform
              regular routine backups of data, you are solely responsible for
              all data that you transmit or that relates to any activity you
              have undertaken using the Site. You agree that we shall have no
              liability to you for any loss or corruption of any such data, and
              you hereby waive any right of action against us arising from any
              such loss or corruption of such data.
            </Label>
            <Label className="mt-5 custom-table-heading">
              ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              Visiting the Site, sending us emails, and completing online forms
              constitute electronic communications. You consent to receive
              electronic communications, and you agree that all agreements,
              notices, disclosures, and other communications we provide to you
              electronically, via email and on the Site, satisfy any legal
              requirement that such communication be in writing. YOU HEREBY
              AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND
              OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES,
              AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA
              THE SITE. You hereby waive any rights or requirements under any
              statutes, regulations, rules, ordinances, or other laws in any
              jurisdiction which require an original signature or delivery or
              retention of non-electronic records, or to payments or the
              granting of credits by any means other than electronic means.
            </Label>
            <Label className="mt-5 custom-table-heading">
              CALIFORNIA USERS AND RESIDENTS
            </Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              If any complaint with us is not satisfactorily resolved, you can
              contact the Complaint Assistance Unit of the Division of Consumer
              Services of the California Department of Consumer Affairs in
              writing at 1625 North Market Blvd., Suite N 112, Sacramento,
              California 95834 or by telephone at (800) 952-5210 or (916)
              445-1254.
            </Label>
            <Label className="mt-5 custom-table-heading">MISCELLANEOUS</Label>
            <br />
            <Label className="mt-3 custom-checkbox-label text-dark">
              These Terms of Use and any policies or operating rules posted by
              us on the Site or in respect to the Site constitute the entire
              agreement and understanding between you and us. Our failure to
              exercise or enforce any right or provision of these Terms of Use
              shall not operate as a waiver of such right or provision. These
              Terms of Use operate to the fullest extent permissible by law. We
              may assign any or all of our rights and obligations to others at
              any time. We shall not be responsible or liable for any loss,
              damage, delay, or failure to act caused by any cause beyond our
              reasonable control. If any provision or part of a provision of
              these Terms of Use is determined to be unlawful, void, or
              unenforceable, that provision or part of the provision is deemed
              severable from these Terms of Use and does not affect the validity
              and enforceability of any remaining provisions. There is no joint
              venture, partnership, employment, or agency relationship created
              between you and us as a result of these Terms of Use or use of the
              Site. You agree that these Terms of Use will not be construed
              against us by virtue of having drafted them. You hereby waive any
              and all defenses you may have based on the electronic form of
              these Terms of Use and on the lack of signing by the parties
              hereto to execute these Terms of Use.
            </Label>
            <Label className="mt-5 custom-table-heading">CONTACT US</Label>
            <br />
            <Label className="mt-3 mb-5 custom-checkbox-label text-dark">
              In order to resolve a complaint regarding the Site or to receive
              further information regarding use of the Site, please contact us
              at:
              <br />
              <br />
              FansHelpPlayers, LLC
              <br />
              128 Dorchester F
              <br />
              West Palm Beach, FL 33417
              <br />
              United States <br />
              <a href="mailto:unkle5408@gmail.com" target="_blank">
                unkle5408@gmail.com
              </a>
            </Label>
          </div>
        </div>
      </Container>
    </>
  );
}

export default TermsAndConditions;
