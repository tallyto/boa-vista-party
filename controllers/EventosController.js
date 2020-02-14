const removeImageS3 = require('./../config/removeImageS3');

const Eventos = require('../models/eventoSchema');

class EventosController {
  async listarEventos(req, res) {
    const eventos = await Eventos.find().sort({ title: 1 });
    res.render('admin/eventos', { eventos, title: 'Eventos' });
  }

  pageCadastrarEvento(req, res) {
    res.render('admin/cadastrar-evento', { title: 'Cadastrar Evento' });
  }

  async pageEditarEvento(req, res) {
    const { id } = req.params;
    const evento = await Eventos.findById({ _id: id });
    res.render('admin/editar-evento', { evento, title: `Editar evento ${evento.title}` });
  }

  async editarEvento(req, res) {
    const {
      id, title, description, slug,
    } = req.body;

    try {
      const evento = await Eventos.findById({ _id: id });
      evento.title = title;
      evento.description = description;
      evento.slug = slug;
      await evento.save();
      req.flash('success_msg', 'Evento editado com sucesso');
      res.redirect('/eventos');
    } catch (error) {
      req.flash('error_msg', 'Houve um erro ao editar o evento');
      res.redirect('/admin/eventos');
    }
  }

  async deletarEvento(req, res) {
    const { id } = req.body;
    const erros = [];

    try {
      const evento = await Eventos.findByIdAndDelete({ _id: id });
      removeImageS3(evento.img.key);
      req.flash('success_msg', 'Evento removido com sucesso');
      res.redirect('/eventos');
    } catch (error) {
      erros.push({ texto: 'Houve um erro ao deletar o evento' });
      res.render('admin/eventos', {
        erros, title: 'Eventos',
      });
    }
  }

  async cadastrarEvento(req, res) {
    const { title, description, slug } = req.body;
    const {
      originalname: name, size, key, location: url = '',
    } = req.file;
    const newEvento = {
      title,
      description,
      slug,
      img: {
        name,
        size,
        key,
        url,
      },
    };

    const erros = [];

    try {
      await Eventos.create(newEvento);
      req.flash('success_msg', 'Evento criado com sucesso');
      res.redirect('/eventos');
    } catch (error) {
      erros.push({ texto: 'Houve um erro ao cadastrar o evento' });
      res.render('admin/cadastrar-evento', {
        erros, title: 'Cadastrar Evento',
      });
    }
  }
}


module.exports = new EventosController();
