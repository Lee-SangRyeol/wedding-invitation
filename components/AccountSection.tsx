'use client'

import { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

interface BankAccount {
  bank: string
  accountNumber: string
  accountHolder: string
}

interface AccountSectionProps {
  groomAccounts: BankAccount[]
  brideAccounts: BankAccount[]
}

const Section = styled.section`
  width: 100%;
  padding: 38px 26px;
  background-color:rgb(223, 235, 202);;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 100px;
`

const Container = styled.div`
  max-width: 28rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const FlowerIconWrapper = styled.div`
  width: 2rem;
  height: auto;
  margin: 0 auto 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }
`

const Title = styled.h2`
  font-size: 20px;
  color: #89757a;
  text-align: center;
  font-weight: 600;
  font-family: 'IropkeBatangM', serif;
  margin-bottom: 1.5rem;
`

const AccountGroup = styled.div`
  width: 85%;
  background-color:rgb(240, 240, 240);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
`

const AccountGroupHeader = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:rgb(184, 202, 150);
  border: none;
  cursor: pointer;
  font-family: 'IropkeBatangM', serif;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  &:active {
    background-color: rgb(178, 198, 142);
  }

  &:focus {
    outline: none;
  }
`

const AccountGroupTitle = styled.div`
  font-size: 0.875rem;
  color: #89757a;
  font-weight: 400;
`

const ToggleIcon = styled.div<{ $isOpen: boolean }>`
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  
  &::after {
    content: '▲';
    font-size: 0.75rem;
    color: #89757a;
  }
`

const AccountList = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`

const AccountItem = styled.div`
  border-top: 1px solid #e5e7eb;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

const AccountInfo = styled.div`
  padding: 1rem 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`

const BankAndAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  font-family: 'IropkeBatangM', serif;
`

const BankName = styled.span`
  color: #374151;
`

const Separator = styled.span`
  color: #9ca3af;
`

const AccountNumber = styled.span`
  color: #374151;
`

const AccountHolder = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-family: 'IropkeBatangM', serif;
`

const CopiedMessage = styled.div`
  padding: 1.5rem 1rem;
  text-align: center;
  background-color: rgb(231, 236, 223);
  color: #89757a;
  font-family: 'IropkeBatangM', serif;
  font-size: 0.875rem;
  font-weight: 600;
  width: 100%;
`

const CopyButton = styled.button`
  margin-right: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: #f3f4f6;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: 'IropkeBatangM', serif;
  white-space: nowrap;
  flex-shrink: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  transition: background-color 0.2s;

  &:active {
    background-color: #e5e7eb;
  }

  &:focus {
    outline: none;
  }
`

const CopyIcon = styled.svg`
  width: 0.875rem;
  height: 0.875rem;
  fill: #374151;
  flex-shrink: 0;
`


const DescriptionText = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  font-family: 'IropkeBatangM', serif;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  
  @media (min-width: 768px) {
    font-size: 0.9375rem;
    line-height: 2;
  }
`

export default function AccountSection({ groomAccounts, brideAccounts }: AccountSectionProps) {
  const [groomOpen, setGroomOpen] = useState(false)
  const [brideOpen, setBrideOpen] = useState(false)
  const [copiedAccountIds, setCopiedAccountIds] = useState<Set<string>>(new Set())

  const fadeInOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  const flowerRef = useScrollFadeIn({ ...fadeInOptions, delay: 0 }) as React.RefObject<HTMLDivElement>
  const titleRef = useScrollFadeIn({ ...fadeInOptions, delay: 200 }) as React.RefObject<HTMLHeadingElement>
  const groomRef = useScrollFadeIn({ ...fadeInOptions, delay: 400 }) as React.RefObject<HTMLDivElement>
  const brideRef = useScrollFadeIn({ ...fadeInOptions, delay: 600 }) as React.RefObject<HTMLDivElement>

  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch (err) {
        console.error('클립보드 복사 실패:', err)
        return fallbackCopyTextToClipboard(text)
      }
    }
    return fallbackCopyTextToClipboard(text)
  }

  const fallbackCopyTextToClipboard = (text: string): boolean => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      const successful = document.execCommand('copy')
      return successful
    } catch (err) {
      console.error('Fallback 복사 오류:', err)
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }

  const handleCopy = async (account: BankAccount, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const accountText = `${account.bank} ${account.accountNumber} ${account.accountHolder}`
    const success = await copyToClipboard(accountText)
    
    if (success) {
      const accountId = `${account.bank}-${account.accountNumber}`
      setCopiedAccountIds(prev => new Set(prev).add(accountId))
      
      setTimeout(() => {
        setCopiedAccountIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(accountId)
          return newSet
        })
      }, 2000)
    }
  }

  return (
    <Section>
      <Container>
        <FlowerIconWrapper ref={flowerRef}>
          <Image
            src="/img/flower.png"
            alt="꽃 아이콘"
            width={32}
            height={48}
            priority
          />
        </FlowerIconWrapper>
        <Title ref={titleRef}>마음 전하실 곳</Title>
        <DescriptionText>
          참석이 어려워 직접 축하를 전하지 못하는<br />
          분들을 위해 계좌번호를 기재했습니다.<br />
          <br />
          전해주시는 진심은 소중하게 간직하여<br />
          좋은 부부의 모습으로 보답하겠습니다.
        </DescriptionText>

        <AccountGroup ref={groomRef}>
          <AccountGroupHeader onClick={() => setGroomOpen(!groomOpen)}>
            <AccountGroupTitle>신랑측 계좌번호</AccountGroupTitle>
            <ToggleIcon $isOpen={groomOpen} />
          </AccountGroupHeader>
          <AccountList $isOpen={groomOpen}>
            {groomAccounts.map((account, index) => {
              const accountId = `${account.bank}-${account.accountNumber}`
              const isCopied = copiedAccountIds.has(accountId)
              
              return (
                <AccountItem key={index}>
                  {isCopied ? (
                    <CopiedMessage>복사가 완료되었습니다</CopiedMessage>
                  ) : (
                    <>
                      <AccountInfo>
                        <BankAndAccount>
                          <BankName>{account.bank}</BankName>
                          <Separator>|</Separator>
                          <AccountNumber>{account.accountNumber}</AccountNumber>
                        </BankAndAccount>
                        <AccountHolder>{account.accountHolder}</AccountHolder>
                      </AccountInfo>
                      <CopyButton onClick={(e) => handleCopy(account, e)}>
                        <CopyIcon aria-hidden="true" viewBox="0.48 0.48 23.04 23.04" fill="#222F3D">
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                        </CopyIcon>
                        복사
                      </CopyButton>
                    </>
                  )}
                </AccountItem>
              )
            })}
          </AccountList>
        </AccountGroup>

        <AccountGroup ref={brideRef}>
          <AccountGroupHeader onClick={() => setBrideOpen(!brideOpen)}>
            <AccountGroupTitle>신부측 계좌번호</AccountGroupTitle>
            <ToggleIcon $isOpen={brideOpen} />
          </AccountGroupHeader>
          <AccountList $isOpen={brideOpen}>
            {brideAccounts.map((account, index) => {
              const accountId = `${account.bank}-${account.accountNumber}`
              const isCopied = copiedAccountIds.has(accountId)
              
              return (
                <AccountItem key={index}>
                  {isCopied ? (
                    <CopiedMessage>복사가 완료되었습니다</CopiedMessage>
                  ) : (
                    <>
                      <AccountInfo>
                        <BankAndAccount>
                          <BankName>{account.bank}</BankName>
                          <Separator>|</Separator>
                          <AccountNumber>{account.accountNumber}</AccountNumber>
                        </BankAndAccount>
                        <AccountHolder>{account.accountHolder}</AccountHolder>
                      </AccountInfo>
                      <CopyButton onClick={(e) => handleCopy(account, e)}>
                        <CopyIcon aria-hidden="true" viewBox="0.48 0.48 23.04 23.04" fill="#222F3D">
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                        </CopyIcon>
                        복사
                      </CopyButton>
                    </>
                  )}
                </AccountItem>
              )
            })}
          </AccountList>
        </AccountGroup>
      </Container>
    </Section>
  )
}

