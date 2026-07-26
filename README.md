# Kawaala College School — website

*"Seek Knowledge and Serve"*

This folder is the complete website. It is plain HTML, CSS and JavaScript, with
no build step and no database, so it will run on any web host and can be edited
with nothing more than Notepad.

This guide is written for whoever looks after the school's website, not for a
programmer. Take it slowly and nothing will break.

---

## 1. The golden rule

**Before you change anything, make a copy of the whole folder.**

Right-click the `kawaala-college-school` folder → Copy → Paste. Name the copy
something like `kawaala-college-school-backup-12-March`. If an edit goes wrong,
delete the broken folder and rename the backup. That is the whole recovery plan,
and it has never failed anybody.

---

## 2. What is in this folder

| File or folder | What it is |
|---|---|
| `index.html` | The home page |
| `about.html` | About the school, vision, mission, why choose us |
| `academics.html` | O-Level and A-Level subjects |
| `vocational.html` | The eight practical courses |
| `admissions.html` | How to apply, entry requirements, enquiry form |
| `campuses.html` | Namungoona and the new Gayaza campus |
| `gallery.html` | Photographs |
| `news.html` | News and events |
| `contact.html` | Contact details, map, contact form |
| `404.html` | Shown when somebody types a wrong address |
| `css/styles.css` | Every colour, size and spacing on the site |
| `js/main.js` | The slideshow, menu, gallery and form behaviour |
| `assets/` | All photographs, the crest and the icons |
| `sitemap.xml`, `robots.txt` | Help Google find the site |
| `serve.js` | For previewing on your own computer. **Do not upload it.** |

---

## 3. How to edit text

1. Right-click the page you want to change, for example `about.html`.
2. Choose **Open with → Notepad** (or Notepad++, or VS Code if you have it).
3. Use **Ctrl+F** to search for the words you want to change.
4. Change **only the words between the angle brackets**, never the brackets.

```html
<h3 class="h-card">Highly trained teachers</h3>
                   ^^^^^^^^^^^^^^^^^^^^^^^ change this part only
```

5. Save with **Ctrl+S**, then upload the file (see section 8).

**Things that will break the page if you delete them:** anything inside
`< >` brackets, and anything that looks like `class="..."`. If you delete an
angle bracket by mistake, close the file **without saving** and start again.

---

## 4. How to replace a photograph

This is the easiest change to make, and the one the site needs most.

1. Take the new photograph. A phone is fine — hold it **sideways (landscape)**
   and make sure the room is bright.
2. Rename your new photo to **exactly** the name of the one you are replacing,
   including the `.jpg` at the end.
3. Copy it into the same folder inside `assets/`, replacing the old file.
4. Upload just that file.

The photographs currently on the site, and where each one appears:

| File in `assets/` | Where it shows |
|---|---|
| `skills/tailoring.jpg` | Home slideshow, academics, gallery |
| `events/workshop-certificates.jpg` | Home slideshow, about, news, gallery |
| `facilities/science-laboratory.jpg` | Home slideshow, about, gallery |
| `campus/gayaza-construction-01.jpg` | Home slideshow, admissions, campuses |
| `campus/gayaza-construction-02.jpg` | Home page facilities, campuses |
| `facilities/library.jpg` | Home page, campuses, gallery |
| `facilities/laboratory-chemicals.jpg` | Home page, academics, gallery |
| `skills/salon.jpg` | Vocational, gallery |
| `skills/bakery-catering.jpg` | Vocational, gallery |

### About the `-640` and `-1024` versions

You will notice three files for most photos, for example:

```
library.jpg        <- the big one, for computers
library-1024.jpg   <- medium, for tablets
library-640.jpg    <- small, for phones
```

This is what keeps the site fast on a phone connection. **Replace all three**
with your new photo. It is fine to simply save the same new photo three times
under the three names — the site will still work correctly, it will just use a
little more data on phones. If you want it done properly, ask whoever helps you
with the site to resize them to 640 and 1024 pixels wide.

**Important:** every photograph currently on this site was cut out of the
printed leaflet, so they are softer and grainier than they should be. Almost any
photo taken on a modern phone will look better. Replacing them is the single
biggest improvement you can make.

---

## 5. Turning the forms on

Right now the enquiry form and the contact form **do not send anything**. When
somebody fills one in, they are told clearly to phone the school instead, so
nobody is left thinking their message arrived when it did not.

To switch them on, free of charge:

1. Go to **https://formspree.io** and create an account using the school email
   address, `kawaalacollegeschool1341@gmail.com`.
2. Create a new form. Formspree will give you an address that looks like
   `https://formspree.io/f/abcdwxyz`.
3. Open `js/main.js` in Notepad. Near the top you will see:

```js
var FORM_ENDPOINT = 'REPLACE_WITH_YOUR_FORMSPREE_URL';
```

4. Replace the words inside the quotes with your Formspree address, keeping the
   quotes and the semicolon:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
```

5. Save, upload `js/main.js`, then **send yourself a test message** from the
   contact page to check it arrives.

---

## 6. Adding a news item

Open `news.html` and find a block that starts like this:

```html
<article class="news-card reveal">
  <div class="news-card__meta">
    <span class="date-chip">Ongoing</span>
    <span class="news-card__cat">Admissions</span>
  </div>
  <h3 class="h-card">Registration is in progress</h3>
  <p>Day and boarding places are open ...</p>
  <a class="link-more" href="admissions.html">How to apply</a>
</article>
```

Select from `<article` down to `</article>`, copy it, and paste it directly
below. Then change four things in your new copy:

- `Ongoing` → the date, for example `12 March 2026`
- `Admissions` → the category, for example `Sports` or `Results`
- the words in the `<h3>` line → your headline
- the words in the `<p>` line → two or three sentences

Save and upload. Newest items should go at the top.

---

## 7. Changing colours or text size

Everything visual is controlled from the top of `css/styles.css`. Open it and
you will see a block that begins `:root {`. Change a colour there and it changes
everywhere on the site at once.

```css
--kcs-red:    #C8102E;   /* buttons, banners, caption bars */
--kcs-maroon: #6E1218;   /* footer, subject panel labels */
--kcs-gold:   #D9A93F;   /* the thin gold stripe on every red band */
--kcs-cream:  #F6E7C1;   /* subject panels */
```

Please do not change colours anywhere else in the file — those values were
checked so that text stays readable for people with poor eyesight, and changing
them at random can quietly make parts of the site unreadable.

---

## 8. Putting the site on the internet

The whole site is just files, so uploading is straightforward.

**What to upload:** everything in this folder **except** `README.md` and
`serve.js`, which are only for you.

### On ordinary web hosting (cPanel, Hostinger, Bluehost, a Ugandan host)

1. Log in to your hosting control panel and open **File Manager**.
2. Go into the folder called `public_html`.
3. Upload every file and folder, keeping the same structure — `css` must stay
   inside its own folder, `assets` inside its own, and so on.
4. Visit your domain. The site should appear.

### Free option: GitHub Pages

1. Create a free account at github.com and make a new repository.
2. Upload all the files.
3. Go to **Settings → Pages** and set the source to the `main` branch.
4. Your site appears at `https://yourname.github.io/repository-name`.

### One last step after going live

Open `sitemap.xml` and `robots.txt` and replace every
`www.kawaalacollegeschool.ac.ug` with your real domain name. Do the same for the
`canonical` and `og:url` lines near the top of each `.html` file. This helps
Google list the school correctly.

---

## 9. Previewing on your own computer

If you have Node.js installed, open this folder in a terminal and run:

```bash
node serve.js
```

Then open **http://localhost:4180** in your browser. Press `Ctrl+C` to stop.

If you do not have Node.js, you can simply double-click `index.html` to open it
in a browser. Most things will work, though the pages will not link together
quite as neatly as they do on a real web address.

---

## 10. A note on the header and footer

The top bar and the bottom bar are **repeated inside all ten HTML files**. This
was a deliberate choice: it means the menu works instantly, works even if
JavaScript fails, and works on the slowest connection.

The trade-off is that **if you add a new page to the menu, you must make the
same change in all ten files.** In each file, look for these markers:

```html
<!-- HEADER START — this block is repeated in every .html file. Edit all of them together. -->
...
<!-- HEADER END -->
```

Everything between them must stay identical across the ten files.

---

## 11. Still to send — the outstanding list

Nothing below has been invented or guessed at. Where a fact was missing, the
site shows a visible gold-dashed note asking for it rather than filling it with
something made up. Send these and the site is finished.

### Needed before launch

1. **A high-resolution crest.** The one in use was cut from a photograph of the
   leaflet and is only 192 pixels across. A PNG with a transparent background,
   or a vector file from whoever designed it, would replace
   `assets/logo/crest-placeholder.png` and `assets/logo/favicon.svg`.
2. **Fees structure** — per term, by class, day and boarding, plus the
   requirements list. *Shown on:* `admissions.html`. Tell us if you would rather
   not publish fees publicly and we will invite parents to call the bursar
   instead.
3. **Term dates / academic calendar**, including visiting days. *Shown on:*
   `admissions.html`.
4. **Head teacher's name, photograph and a short welcome** of about eighty
   words. *Shown on:* `about.html`.
5. **Office opening hours.** *Shown on:* `contact.html`.

### Needed soon after

6. **Real testimonials** — two or three from students, parents or old students,
   each with a first name and a role. *Shown on:* `index.html`.
7. **UNEB results** for the last two or three years: candidates entered and how
   many in each division, at O and A Level. *Shown on:* `academics.html`.
8. **The opening term for the Gayaza campus**, and which classes will move
   there. *Shown on:* `campuses.html`.
9. **Social media handles** — Facebook, TikTok, X, Instagram. No social links
   appear anywhere on the site until these arrive, rather than linking to
   nothing.
10. **News items** — a headline, two or three sentences, the date and a
    photograph for each. *Shown on:* `index.html` and `news.html`.
11. **The date of the certificates ceremony** already shown on `news.html`.

### Photographs most wanted

The front of the school and its signboard · a classroom during a lesson · the
computer laboratory · the welding workshop · the motor vehicle workshop · the
kitchen and dining hall · the boarding dormitories · a sports day · a school
assembly · the head teacher · a group of teachers.

A landscape photo from any recent phone will be a large improvement on what is
there now.

---

## 12. What was checked before hand-over

- All ten pages tested at 360, 414, 768, 1024, 1280 and 1440 pixels wide —
  sixty combinations, no sideways scrolling anywhere.
- Keyboard-only use: skip link, menu with `Esc` to close, gallery lightbox with
  arrow keys, and focus always returning where it started.
- Colour contrast measured on the rendered pages against the WCAG AA standard.
- The site was loaded with JavaScript switched off entirely: every section stays
  visible and every phone number stays clickable.
- Every internal link and every image path resolved — no dead links.
- All 15 O-Level and 15 A-Level subjects and all 8 vocational courses verified
  against the leaflet.

Registration No. PSS/K/172 · UNEB Centre U1314 · DIT Centre UVQF/5176
