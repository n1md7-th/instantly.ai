import * as style from "@/styles/Home.module.css";
import {Box, Button, Divider, FormControl, Modal, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";

export default function Home() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeEmailKey, setActiveEmailKey] = useState(1);
  const [search, setSearch, emails] = useSearch();


  const handleSelect = key => () => {
    setSelectedEmail(emails[key]);
    setActiveEmailKey(key);
  };

  return (
    <>
      <SendEmail/>
      <Stack direction="row" className={style.inboxView}>
        <Stack className={style.inboxContainer}>
          <Box className={style.inboxHeader}>
            <FormControl fullWidth sx={{m: 1}}>
              <TextField
                size="small"
                label="Search"
                autoComplete="off"
                variant="outlined"
                value={search}
                onChange={setSearch}/>
            </FormControl>
          </Box>
          <Box className={style.inboxList}>
            {
              emails.length > 0 ? emails.map((email, key) => (
                <div
                  key={key}
                  data-selected={activeEmailKey === key}
                  className={style.inboxListItem}
                  onClick={handleSelect(key)}
                >
                  <Stack direction="row" className={style.inboxListItemHeader}>
                    <Box className={style.inboxItemTo}>
                      <strong>{email.to}</strong>
                    </Box>
                    <Box>
                      <span className={style.inboxSentDate}>{email.createdAt}</span>
                    </Box>
                  </Stack>
                  <Box className={style.inboxItemSubject}>
                    <span>{email.subject || '(no subject)'}</span>
                  </Box>
                  <Box className={style.inboxBodyText}>
                    {(email.body || '(no body)').substring(0, 64)}
                  </Box>
                </div>
              )) : (
                <Box className={style.noEmailsFound}>No emails found</Box>
              )
            }
          </Box>
        </Stack>
        <Stack className={style.messageContainer}>
          {
            <EmailContent email={selectedEmail}/>
          }
        </Stack>
      </Stack>
    </>

  )
}

function EmailContent({email}) {
  if (!email) return <Box className={style.noEmailSelected}>No Message Selected</Box>

  return (
    <Stack className={style.inboxContent} padding={2} gap={2}>
      <Stack direction="row" sx={{justifyContent: 'space-between'}}>
        <Box className={style.inboxItemTo}>
          <span>To: </span>
          <strong>{email.to}</strong>
        </Box>
        <Box className={style.inboxSentDate}>
          <span>{email.date}</span>
        </Box>
      </Stack>
      <Stack>
        <Box className={style.inboxItemTo}>
          <span>Cc: </span>
          <strong>{email.cc || '(no cc)'}</strong>
        </Box>
      </Stack>
      <Stack>
        <Box className={style.inboxItemTo}>
          <span>Bcc: </span>
          <strong>{email.bcc || '(no bcc)'}</strong>
        </Box>
      </Stack>
      <Stack direction="column" gap={3}>
        <Box>
          <span>Subject: </span>
          <strong>{email.subject || '(no subject)'}</strong>
        </Box>
        <Divider/>
        <Box>{email.body || '(no body)'}</Box>
      </Stack>
    </Stack>
  )
}

function SendEmail() {
  const {send} = useSend();

  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({});

  const handleSubmit = () => send(payload)
    .then(() => {
      setOpen(false);
      setError(null);
      setPayload({});
    }).catch(e => {
      console.info(e)
      setError(e.message)
    });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (key) => (e) => {
    setPayload({...payload, [key]: e.target.value});
  }


  return (
    <>
      <Button onClick={handleOpen} className={style.sendEmailBtn} variant="contained">Send email</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Stack padding={2} gap={2}>
            <Stack alignContent="center">
              <h3>Send Email</h3>
              <p style={{color: 'red'}}>{error}</p>
            </Stack>
            <Stack gap={2} direction="column">
              <TextField
                label="To"
                variant="outlined"
                onChange={handleChange('to')}
              />
              <TextField
                label="Cc"
                variant="outlined"
                onChange={handleChange('cc')}
              />
              <TextField
                label="Bcc"
                variant="outlined"
                onChange={handleChange('bcc')}
              />
            </Stack>
            <TextField
              label="Subject"
              variant="outlined"
              onChange={handleChange('subject')}
            />
            <TextField
              label="Body"
              variant="outlined"
              multiline={true}
              rows={8}
              onChange={handleChange('body')}
            />
            <Stack direction="row">
              <Button variant="contained" onClick={handleSubmit}>Send</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}


function useApi() {
  const baseURL = '/api';

  const get = async (path, query, defaultValue = []) => {
    const params = new URLSearchParams();

    for (const key in query) {
      params.append(key, query[key]);
    }

    return await fetch(`${baseURL}${path}?${params.toString()}`)
      .then(response => response.json())
  };

  const post = async (path, data) => {
    return await fetch(`${baseURL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json().then(data => {
        if (!response.ok) throw data;
        return data;
      });
    });
  }

  return {get, post};
}

function useSearch() {
  const api = useApi();
  const [search, setSearch] = useState('');
  const [emails, setEmails] = useState([]);

  const handleSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    const handler = setTimeout(() => {
      api.get('/sent', {search}).then(setEmails);
    }, 500);

    return () => {
      clearTimeout(handler);
    }
  }, [search]);

  return [search, handleSearch, emails];
}

function useSend() {
  const api = useApi();

  const send = async (data) => {
    return await api.post('/send', data);
  }

  return {send};
}
