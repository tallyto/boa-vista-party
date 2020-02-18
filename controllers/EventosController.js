const removeImageS3 = require('./../config/removeImageS3');

const Eventos = require('../models/eventoSchema');

class EventosController {
  async listarEventos(req, res) {
    const eventos = await Eventos.find().sort({ title: 1 });
    res.render('admin/eventos', { eventos, title: 'Boa Vista Party - Eventos' });
  }

  pageCadastrarEvento(req, res) {
    res.render('admin/cadastrar-evento', { title: 'Boa Vista Party - Cadastrar Evento' });
  }

  async pageEditarEvento(req, res) {
    const { id } = req.params;
    const evento = await Eventos.findById({ _id: id });
    res.render('admin/editar-evento', { evento, title: `Boa Vista Party - Editar Evento ${evento.title}` });
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

    try {
      const evento = await Eventos.findByIdAndDelete({ _id: id });
      removeImageS3(evento.img.key);
      req.flash('success_msg', 'Evento removido com sucesso');
      res.redirect('/eventos');
    } catch (error) {
      req.flash('error_msg', 'Houve um erro ao deletar o evento');
      res.redirect('/admin/eventos');
    }
  }

  async cadastrarEvento(req, res) {
    try {
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

      await Eventos.create(newEvento);
      req.flash('success_msg', 'Evento criado com sucesso');
      res.redirect('/eventos');
    } catch (error) {
      req.flash('error_msg', 'Houve um erro ao cadastrar o evento');
      res.redirect('/admin/cadastrar/evento');
    }
  }
}


module.exports = new EventosController();
